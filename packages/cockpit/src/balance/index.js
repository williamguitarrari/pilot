import Promise from 'bluebird'
import moment from 'moment'
import {
  __,
  assoc,
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

const balance = client => (recipientId, {
  count,
  dates: {
    end: endDate,
    start: startDate,
  },
  page,
  status = 'available',
} = {}) =>
  Promise.props({
    balance: client.balance.find({ recipientId }),
    bulk_anticipations_limit: getBulkAnticipationsLimits(client, recipientId),
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
      status,
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
      status,
    }))

export default balance
