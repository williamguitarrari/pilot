import { props } from 'bluebird'

import {
  chargebackQuery,
  transactionsQuery,
} from './queries'

import buildResult from './result'

const chargeback = client => dates => props({
  chargebacks: client.search({
    type: 'chargeback_operation',
    query: JSON.stringify(chargebackQuery(dates)),
  }),
  transactions: client.search({
    type: 'transaction',
    query: JSON.stringify(transactionsQuery(dates)),
  }),
})
  .then(buildResult)

export default chargeback
