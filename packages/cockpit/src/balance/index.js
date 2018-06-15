import Promise from 'bluebird'
import moment from 'moment'
import {
  __,
  always,
  assoc,
  isNil,
  when,
} from 'ramda'
import {
  nextAnticipableBusinessDay,
  requestBusinessCalendar,
} from '../business'
import buildResult from './result'

const getBulkAnticipationsLimits = (client, recipientId) => {
  const now = moment()

  return requestBusinessCalendar(now.year())
    .then(calendar =>
      nextAnticipableBusinessDay(calendar, { hour: 10 }, now))
    .then(paymentDate => paymentDate.valueOf())
    .then(assoc('payment_date', __, { recipientId, timeframe: 'start' }))
    .then(client.bulkAnticipations.limits)
}

const defaultBulkAnticipationLimits = {
  maximum: {
    amount: 0,
    anticipation_fee: 0,
    fee: 0,
  },
  minimum: {
    amount: 0,
    anticipation_fee: 0,
    fee: 0,
  },
}

const getValidStatus = when(
  isNil,
  always('available')
)

const balance = client => (recipientId, {
  count,
  dates: {
    end: endDate,
    start: startDate,
  },
  page,
  status,
} = {}) =>
  Promise.props({
    balance: client.balance.find({ recipientId }),
    bulk_anticipations_limit: getBulkAnticipationsLimits(client, recipientId)
      .catch((error) => {
        if (error.response) {
          const err = error.response.errors[0]
          if (err && err.type === 'action_forbidden') {
            return defaultBulkAnticipationLimits
          }
        }

        throw error
      }),
    bulk_anticipations_pending: client.bulkAnticipations.find({
      recipientId,
      status: 'pending',
    }),
    operations: client.balanceOperations.find({
      count,
      end_date: moment(endDate).valueOf(),
      page,
      recipientId,
      start_date: moment(startDate).valueOf(),
    }),
    per_day: client.balanceOperations.days({
      end_date: moment(endDate).valueOf(),
      recipient_id: recipientId,
      start_date: moment(startDate).valueOf(),
      status: getValidStatus(status),
    }),
    recipient: client.recipients.find({ id: recipientId }),
  })
    .then(buildResult({
      count,
      dates: {
        end: endDate,
        start: startDate,
      },
      page,
      status: getValidStatus(status),
    }))


export default balance
