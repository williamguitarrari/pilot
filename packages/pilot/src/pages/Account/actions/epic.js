import pagarme from 'pagarme'
import { identity } from 'ramda'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'

import { combineEpics } from 'redux-observable'

import {
  receiveLogin,
  receiveAccount,
  failLogin,
  LOGIN_REQUEST,
  LOGIN_RECEIVE,
} from '.'

const loginEpic = action$ =>
  action$
    .ofType(LOGIN_REQUEST)
    .mergeMap(action => (
      pagarme.client.connect(action.payload)
    ))
    .map(receiveLogin)
    .catch((error) => {
      try {
        localStorage.removeItem('redux_localstorage_simple_account.sessionId')
      } catch (err) {
        console.warn(err.message) //eslint-disable-line
      }
      return Observable.of(failLogin(error))
    })


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

export default combineEpics(loginEpic, accountEpic)
