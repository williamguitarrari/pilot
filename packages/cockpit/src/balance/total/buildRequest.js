import moment from 'moment-timezone'
import {
  always,
  curry,
  ifElse,
  isNil,
  propEq,
  uncurryN,
  when,
} from 'ramda'
import formatPayablesRows from './payables'
import formatOperationsRows from './operations'

const buildBaseQuery = ({
  dates: {
    end,
    start,
  },
  recipientId,
}) => ({
  recipient_id: recipientId,
  end_date: moment(end).endOf('day').valueOf(),
  start_date: moment(start).startOf('day').valueOf(),
})

const getValidStatus = when(
  isNil,
  always('available')
)

const buildOperationsQuery = query => ({
  ...buildBaseQuery(query),
  status: getValidStatus(query.status),
})

const buildPayablesQuery = query => ({
  ...buildBaseQuery(query),
  status: ['waiting_funds', 'prepaid'],
})

const buildPayablesRequest = curry((client, query) => {
  const payablesQuery = buildPayablesQuery(query)

  return client.payables
    .days(payablesQuery)
    .then(formatPayablesRows)
})

const buildOperationsRequest = curry((client, query) => {
  const operationsQuery = buildOperationsQuery(query)

  return client.balanceOperations
    .days(operationsQuery)
    .then(formatOperationsRows)
})

const buildRequestPromise = uncurryN(2, client => ifElse(
  propEq('timeframe', 'future'),
  buildPayablesRequest(client),
  buildOperationsRequest(client)
))

export default buildRequestPromise
