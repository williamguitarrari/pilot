import { mergeMap } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import {
  CANCEL_LINK_REQUEST,
  GET_LINK_REQUEST,
  GET_TRANSACTIONS_REQUEST,
  getLinkReceive,
  getLinkRequest,
  getTransactionsReceive,
} from './actions'

const getLinkDetailsEpic = (action$, state$) => action$
  .pipe(
    ofType(GET_LINK_REQUEST),
    mergeMap(({ payload }) => {
      const state = state$.value
      const { account: { client } } = state

      return client.paymentLinks.find({ id: payload })
        .then(getLinkReceive)
    })
  )

const cancelLinkEpic = (action$, state$) => action$
  .pipe(
    ofType(CANCEL_LINK_REQUEST),
    mergeMap(({ payload }) => {
      const state = state$.value
      const { account: { client } } = state

      return client.paymentLinks.cancel({ id: payload })
        .then(() => getLinkRequest(payload))
    })
  )

const getLinkTransactionsEpic = (action$, state$) => action$
  .pipe(
    ofType(GET_TRANSACTIONS_REQUEST),
    mergeMap(async ({ payload }) => {
      const state = state$.value
      const { account: { client } } = state

      return client.paymentLinks.transactions(payload)
        .then(getTransactionsReceive)
    })
  )

export default combineEpics(
  cancelLinkEpic,
  getLinkDetailsEpic,
  getLinkTransactionsEpic
)
