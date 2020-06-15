import {
  mergeMap,
} from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import {
  LINK_POST_REQUEST,
  requestFailLink,
  requestSuccessLink,
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

export default combineEpics(postLinkEpic)
