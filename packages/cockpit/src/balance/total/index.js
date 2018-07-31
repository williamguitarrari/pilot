import moment from 'moment'
import {
  always,
  isNil,
  when,
} from 'ramda'

import buildBalanceTotal from './result'

const getValidStatus = when(
  isNil,
  always('available')
)

const total = client => (recipientId, {
  dates: {
    end: endDate,
    start: startDate,
  },
  status,
} = {}) =>
  client.balanceOperations.days({
    end_date: moment(endDate).valueOf(),
    recipient_id: recipientId,
    start_date: moment(startDate).valueOf(),
    status: getValidStatus(status),
  })
    .then(buildBalanceTotal)


export default total
