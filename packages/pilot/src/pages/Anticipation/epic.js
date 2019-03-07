import { pathOr } from 'ramda'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import moment from 'moment'
import env from '../../environment'
import {
  ANTICIPABLE_LIMITS_REQUEST,
  DESTROY_ANTICIPATION_REQUEST,
  destroyAnticipationReceive,
  receiveLimits,
  requestLimits,
  failLimits,
} from './actions'

const getRecipientId = pathOr(null, ['account', 'company', 'default_recipient_id', env])

const getAnticipationLimits = (client, {
  payment_date: paymentDate,
  recipientId,
  timeframe,
}) => client
  .bulkAnticipations
  .limits({
    payment_date: paymentDate.valueOf(),
    recipientId,
    timeframe,
  })

const destroyAnticipation = (client, {
  anticipationId,
  recipientId,
}) => (
  client.bulkAnticipations.destroy({
    id: anticipationId,
    recipientId,
  })
)

const limitsEpic = (action$, state$) =>
  action$
    .pipe(
      ofType(ANTICIPABLE_LIMITS_REQUEST),
      mergeMap(({ payload }) => {
        const state = state$.value
        const recipientId = payload.recipientId || getRecipientId(state)
        const { account: { client } } = state
        const { paymentDate, timeframe } = payload
        return getAnticipationLimits(client, {
          payment_date: paymentDate,
          recipientId,
          timeframe,
        })
      }),
      map(receiveLimits),
      catchError((error) => {
        const { message } = error

        return of(failLimits({ message }))
      })
    )

const destroyAnticipationEpic = (action$, state$) =>
  action$
    .pipe(
      ofType(DESTROY_ANTICIPATION_REQUEST),
      mergeMap(({ payload }) => {
        const state = state$.value
        const { anticipationId } = payload
        const recipientId = payload.recipientId || getRecipientId(state)
        const { account: { client } } = state

        return client
          .business
          .requestBusinessCalendar(moment().get('year'))
          .then((calendar) => {
            const paymentDate = client
              .business
              .nextAnticipableBusinessDay(
                calendar,
                { hour: 10, minute: 20 },
                moment()
              )

            return destroyAnticipation(client, {
              anticipationId,
              recipientId,
            })
              .then(() => ({
                paymentDate,
                recipientId,
                timeframe: 'start',
              }))
          })
      }),
      map(requestLimits),
      map(destroyAnticipationReceive)
    )

export default combineEpics(limitsEpic, destroyAnticipationEpic)
