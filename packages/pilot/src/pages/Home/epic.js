import { of as rxOf } from 'rxjs'
import {
  catchError,
  map,
  mergeMap,
} from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import {
  METRICS_REQUEST,
  receiveMetrics,
  failMetrics,
} from './actions'

const getTransactionsMetrics = (client, dates) => client
  .transactions
  .metrics(dates)

const resetDateTime = (date, time) => date.set({
  hour: 0,
  minute: 0,
  second: 0,
  ...time,
})

const setRangeTimes = ({ end, start }) => ({
  end: resetDateTime(end, {
    hour: 23,
    minute: 59,
    second: 59,
  }),
  start: resetDateTime(start),
})

const metricsEpic = (action$, state$) => action$
  .pipe(
    ofType(METRICS_REQUEST),
    mergeMap(({ payload: dates }) => {
      const state = state$.value
      const { account: { client } } = state
      return getTransactionsMetrics(client, setRangeTimes(dates))
    }),
    map(receiveMetrics),
    catchError((error) => {
      const { message } = error

      return rxOf(failMetrics({ message }))
    })
  )

export default combineEpics(metricsEpic)
