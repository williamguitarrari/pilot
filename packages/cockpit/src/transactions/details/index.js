import {
  all,
  props,
} from 'bluebird'

import {
  __,
  always,
  assoc,
  either,
  head,
  ifElse,
  isEmpty,
  isNil,
  map,
  merge,
  of,
  path,
  pathSatisfies,
  pick,
  pipe,
  prop,
  uncurryN,
} from 'ramda'

import buildResult from './result'
import findReprocessedTransactions from './reprocessedTransactions'

const fetchRecipient = client => object => client
  .recipients.find({ id: object.recipient_id })
  .then(recipient => merge(object, { recipient }))

const payableToRecipient = ifElse(
  either(isNil, isEmpty),
  always([]),
  pipe(
    head,
    pick(['recipient_id']),
    merge({
      charge_processing_fee: true,
      id: null,
      liable: true,
    }),
    of
  )
)

const fetchRecipients = uncurryN(2, client => pipe(
  ifElse(
    pathSatisfies(isNil, ['transaction', 'split_rules']),
    pipe(
      prop('payables'),
      payableToRecipient
    ),
    path(['transaction', 'split_rules'])
  ),
  map(fetchRecipient(client)),
  all
))

const details = client => transactionId => props({
  antifraudAnalyses: client.antifraudAnalyses.find({ transactionId }),
  chargebackOperations: client.chargebackOperations.find({ transactionId }),
  gatewayOperations: client.gatewayOperations.find({ transactionId }),
  payables: client.payables.find({ transactionId }),
  reprocessed: findReprocessedTransactions({ client, transactionId }),
  transaction: client.transactions.find({ id: transactionId }),
})
  .then(data => fetchRecipients(client, data)
    .then(assoc('split_rules', __, data)))
  .then(buildResult)

export default details
