import pagarme from 'pagarme'
import { identity } from 'ramda'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import { combineEpics } from 'redux-observable'
import cockpit from 'cockpit'

import {
  receiveLogin,
  receiveAccount,
  receiveCompany,
  failLogin,
  ACCOUNT_RECEIVE,
  LOGIN_REQUEST,
  LOGIN_RECEIVE,
} from '.'

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
      if (error || typeof window.FS === 'undefined') {
        return
      }
      window.FS.identify(payload.id, { email_str: payload.email })
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
      if (error || typeof window.FS === 'undefined') {
        return
      }
      window.FS.setUserVars({
        companyName_str: payload.name,
        companyId_str: payload.id,
      })
    })

export default combineEpics(loginEpic, accountEpic, companyEpic)
