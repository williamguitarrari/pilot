import { from as rxFrom, of as rxOf } from 'rxjs'
import {
  delay,
  mergeMap,
  catchError,
} from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import {
  CREATE_LINK_REQUEST,
  createLinkFail,
  createLinkReceive,
  getLinksReceive,
  getLinksRequest,
  GET_LINKS_REQUEST,
  RESET_PAGINATION_REQUEST,
  resetPaginationRequest,
} from './actions'
import paymentLinkSpec from '../../../formatters/paymentLinkSpec'

const resetPaginationEpic = (action$, state$) => action$
  .pipe(
    ofType(RESET_PAGINATION_REQUEST),
    delay(5000),
    mergeMap(() => {
      const state = state$.value
      const { paymentLinks: { filter } } = state

      return rxOf(getLinksRequest(filter))
    })
  )

const postLinkEpic = (action$, state$) => action$
  .pipe(
    ofType(CREATE_LINK_REQUEST),
    mergeMap(({ payload }) => {
      const state = state$.value
      const { account: { client } } = state

      return rxFrom(client.paymentLinks.create(paymentLinkSpec(payload)))
    }),
    delay(1000),
    mergeMap(resp => rxOf(createLinkReceive(resp), resetPaginationRequest())),
    catchError(error => rxOf(createLinkFail(error)))
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

export default combineEpics(
  postLinkEpic,
  getLinksEpic,
  resetPaginationEpic
)
