import pagarme from 'pagarme'
import {
  allPass,
  always,
  complement,
  cond,
  hasPath,
  identity,
  ifElse,
  isEmpty,
  path,
  pathEq,
  pathOr,
  propEq,
  T,
} from 'ramda'
import {
  map,
  mergeMap,
  tap,
} from 'rxjs/operators'
import { of as rxOf } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import cockpit from 'cockpit'
import env from '../../../environment'
import identifyUser from '../../../vendor/identifyUser'
import setCompany from '../../../vendor/setCompany'
import { zopimAddTags, zopimClearAll } from '../../../vendor/zopim'
import {
  ACCOUNT_RECEIVE,
  COMPANY_RECEIVE,
  failLogin,
  LOGIN_RECEIVE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  receiveAccount,
  receiveCompany,
  receiveLogin,
  receiveLogout,
  receiveRecipientBalance,
} from './actions'

import store from '../../../configureStore'

import { WITHDRAW_RECEIVE } from '../../Withdraw/actions'
import { receiveError } from '../../ErrorBoundary'
import {
  activeCompanyLogin,
  paymentLinkCompanyLogin,
  inactiveCompanyLogin,
} from '../../../vendor/googleTagManager'

import isPaymentLink from '../../../validation/isPaymentLink'

const isActiveCompany = propEq('status', 'active')
const isSelfRegister = propEq('type', 'self_register')
const isPendingRiskAnalysis = propEq('status', 'pending_risk_analysis')

const pathNotEq = (pathName, propValue) => complement(
  pathEq(pathName, propValue)
)

const hasDashboardAccess = ifElse(
  hasPath(['client', 'authentication', 'allow_dashboard_login']),
  path(['client', 'authentication', 'allow_dashboard_login']),
  allPass([
    pathNotEq(['company', 'type'], 'mei'),
  ])
)

const getRecipientId = pathOr(null, ['account', 'company', 'default_recipient_id', env])

const getAnticipationType = cond([
  [propEq('seller_id', '5ecd6e8a124d4259991313ae'), always('MDRZAO')],
  [T, always('DEFAULT')],
])

const isNotEmpty = complement(isEmpty)

const errorHandler = (error) => {
  store.dispatch(receiveError(error))
  return Promise.reject(error)
}

const verifyCapabilityPermission = client => (
  client.company.current()
    .then((company) => {
      if (!hasDashboardAccess({ client, company })) {
        client.session.destroy(client.authentication.session_id)

        throw new Error('Unauthorized Login')
      }

      return client
    })
)

const loginEpic = action$ => action$
  .pipe(
    ofType(LOGIN_REQUEST),
    mergeMap(action => pagarme.client.connect(action.payload)
      .then(client => cockpit(client, errorHandler))
      .then(verifyCapabilityPermission)
      .then(receiveLogin)
      .catch((error) => {
        try {
          // eslint-disable-next-line no-undef
          localStorage.removeItem('redux_localstorage_simple_account.sessionId')
        } catch (err) {
          console.warn(err.message) //eslint-disable-line
        }
        return failLogin(error)
      }))
  )

const accountEpic = action$ => action$
  .pipe(
    ofType(LOGIN_RECEIVE),
    mergeMap((action) => {
      const { error, payload: client } = action

      if (error) {
        return Promise.resolve(action.payload)
      }

      return client.user.current().catch(identity)
    }),
    map(receiveAccount),
    tap(({ error, payload }) => {
      if (error) {
        return
      }

      const {
        date_created: dateCreated,
        email,
        id,
        name,
        permission,
      } = payload

      identifyUser(
        id,
        email,
        name,
        dateCreated,
        permission,
        env
      )

      zopimAddTags([`nível de acesso do usuário: ${permission}`])
    })
  )

const verifyEnvironmentPermission = (company) => {
  if (
    env === 'live'
    && isSelfRegister(company)
    && isPendingRiskAnalysis(company)
  ) {
    throw new Error('Pending risk analysis')
  }

  if (env === 'live' && !isActiveCompany(company)) {
    throw new Error('Unauthorized environment')
  }

  return company
}

const companyEpic = (action$, state$) => action$.pipe(
  ofType(ACCOUNT_RECEIVE),
  mergeMap(({ error, payload }) => {
    const { value: state } = state$
    const { account: { client } } = state

    if (error) {
      return Promise.resolve(payload)
    }

    return client.company.current()
      .then(verifyEnvironmentPermission)
      .catch(errorPayload => ({
        error: true,
        payload: errorPayload,
      }))
  }),
  mergeMap((action) => {
    if (action.error) {
      return action
    }

    const { value: state } = state$
    const { account: { client } } = state

    const anticipationType = getAnticipationType(action)

    return client
      .transactions
      .all({ count: 1 })
      .then((transactions) => {
        const alreadyTransacted = isNotEmpty(transactions)
        return { ...action, alreadyTransacted, anticipationType }
      })
      .catch(errorPayload => ({
        error: true,
        payload: errorPayload,
      }))
  }),
  mergeMap((action) => {
    if (action.error) {
      return rxOf(receiveError(action.payload))
    }

    return rxOf(receiveCompany(action))
  }),
  tap(({ error, payload }) => {
    if (error) {
      return
    }
    const { value: state } = state$
    const {
      dateCreated,
      id,
      name,
      status,
      type,
    } = payload

    const {
      account: {
        user: {
          id: userId,
        },
      },
    } = state

    setCompany(
      id,
      name,
      dateCreated,
      status,
      type,
      userId
    )

    zopimAddTags([
      `tipo da company: ${type}`,
      `id da company: ${id}`,
      'Aplicação: dashboard beta',
    ])

    if (status === 'active') {
      if (isPaymentLink(type)) {
        paymentLinkCompanyLogin()
      } else {
        activeCompanyLogin()
      }
    } else {
      inactiveCompanyLogin()
    }
  })
)

const recipientBalanceEpic = (action$, state$) => action$.pipe(
  ofType(COMPANY_RECEIVE, WITHDRAW_RECEIVE),
  mergeMap(({ error, payload }) => {
    const state = state$.value
    const recipientId = getRecipientId(state)
    const { account: { client } } = state

    if (error) {
      return Promise.resolve(payload)
    }

    return Promise.all([
      client.recipient.balance(recipientId),
      client.transfers.limits({ recipient_id: recipientId }),
    ])
      .then(([balance, withdrawal]) => ({
        balance,
        withdrawal,
      }))
      .catch(identity)
  }),
  map(receiveRecipientBalance)
)

const logoutEpic = (action$, state$) => action$.pipe(
  ofType(LOGOUT_REQUEST),
  mergeMap(() => {
    const state = state$.value
    const {
      account: {
        client,
        sessionId,
      },
    } = state

    zopimClearAll()

    return client.session
      .destroy(sessionId)
  }),
  map(receiveLogout)
)

export default combineEpics(
  loginEpic,
  accountEpic,
  companyEpic,
  recipientBalanceEpic,
  logoutEpic
)
