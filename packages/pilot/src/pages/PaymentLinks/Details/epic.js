import { mergeMap } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { GET_LINK_REQUEST, getLinkReceive } from './actions'

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

export default combineEpics(getLinkDetailsEpic)
