import {
  mergeMap,
} from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import {
  CREATE_LINK_REQUEST,
  createLinkFail,
  createLinkReceive,
  getLinksReceive,
  GET_LINKS_REQUEST,
} from './actions'
import paymentLinkSpec from '../../formatters/paymentLinkSpec'

const postLinkEpic = (action$, state$) => action$
  .pipe(
    ofType(CREATE_LINK_REQUEST),
    mergeMap(({ payload }) => {
      const state = state$.value
      const { account: { client } } = state

      return client.paymentLinks.create(paymentLinkSpec(payload))
        .then(createLinkReceive)
        .catch(createLinkFail)
    })
  )

const getLinksEpic = (action$, state$) => action$
  .pipe(
    ofType(GET_LINKS_REQUEST),
    mergeMap(({ payload }) => {
      const state = state$.value
      const { account: { client } } = state

      return client.paymentLinks.search(payload)
        .then(getLinksReceive)
    })
  )

export default combineEpics(postLinkEpic, getLinksEpic)
