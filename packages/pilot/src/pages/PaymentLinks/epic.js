import {
  mergeMap,
} from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import {
  LINK_POST_REQUEST,
  LINKS_GET_REQUEST,
  requestFailLink,
  requestSuccessLink,
  receiveGetLinks,
} from './actions'
import paymentLinkSpec from '../../formatters/paymentLinkSpec'

const postLinkEpic = (action$, state$) => action$
  .pipe(
    ofType(LINK_POST_REQUEST),
    mergeMap(({ payload }) => {
      const state = state$.value
      const { account: { client } } = state

      return client.paymentLinks.create(paymentLinkSpec(payload))
        .then(requestSuccessLink)
        .catch(requestFailLink)
    })
  )

const getLinksEpic = (action$, state$) => action$
  .pipe(
    ofType(LINKS_GET_REQUEST),
    mergeMap(() => {
      const state = state$.value
      const { account: { client } } = state

      return client.paymentLinks.find()
        .then(receiveGetLinks)
    })
  )

export default combineEpics(postLinkEpic, getLinksEpic)
