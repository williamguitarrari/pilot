import pagarme from 'pagarme'
import {
  complement,
  identity,
  isNil,
  pathOr,
} from 'ramda'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import { combineEpics } from 'redux-observable'
import cockpit from 'cockpit'
import env from '../../../environment'

import {
  ACCOUNT_RECEIVE,
  COMPANY_RECEIVE,
  failLogin,
  LOGIN_RECEIVE,
  LOGIN_REQUEST,
  receiveAccount,
  receiveCompany,
  receiveLogin,
  receiveRecipientBalance,
} from '.'

import { WITHDRAW_RECEIVE } from '../../Withdraw/actions'

const getRecipientId = pathOr(null, ['account', 'company', 'default_recipient_id', env])

const hasProperty = complement(isNil)

const loginEpic = action$ =>
  action$
    .ofType(LOGIN_REQUEST)
    .mergeMap(action => (
      pagarme.client.connect(action.payload)
        .then(cockpit)
        .then(receiveLogin)
        .catch((error) => {
          try {
            localStorage.removeItem('redux_localstorage_simple_account.sessionId')
          } catch (err) {
            console.warn(err.message) //eslint-disable-line
          }
          return failLogin(error)
        })
    ))

const accountEpic = action$ =>
  action$
    .ofType(LOGIN_RECEIVE)
    .mergeMap((action) => {
      const { error, payload: client } = action

      if (error) {
        return Promise.resolve(action.payload)
      }

      return client.user.current().catch(identity)
    })
    .map(receiveAccount)
    .do(({ error, payload }) => {
      if (error) {
        return
      }

      if (hasProperty(window.dataLayer)) {
        window.dataLayer.push({
          fullstoryUserId: payload.id,
          email: payload.email,
          event: 'loginReceive',
        })
      }

      if (hasProperty(window.FS)) {
        window.FS.identify(payload.id, { email_str: payload.email })
      }
    })

const companyEpic = (action$, store) =>
  action$
    .ofType(ACCOUNT_RECEIVE)
    .mergeMap(({ error, payload }) => {
      const { account: { client } } = store.getState()
      if (error) {
        return Promise.resolve(payload)
      }
      return client.company.current().catch(identity)
    })
    .map(receiveCompany)
    .do(({ error, payload }) => {
      if (error) {
        return
      }

      if (hasProperty(window.dataLayer)) {
        window.dataLayer.push({
          companyId: payload.id,
          companyName: payload.name,
          event: 'accountReceive',
        })
      }

      if (hasProperty(window.FS)) {
        window.FS.setUserVars({
          companyName_str: payload.name,
          companyId_str: payload.id,
        })
      }
    })

const recipientBalanceEpic = (action$, store) =>
  action$
    .ofType(COMPANY_RECEIVE, WITHDRAW_RECEIVE)
    .mergeMap(({ error, payload }) => {
      const state = store.getState()
      const recipientId = getRecipientId(state)
      const { account: { client } } = state

      if (error) {
        return Promise.resolve(payload)
      }

      return client.recipient.balance(recipientId).catch(identity)
    })
    .map(receiveRecipientBalance)

export default combineEpics(loginEpic, accountEpic, companyEpic, recipientBalanceEpic)
