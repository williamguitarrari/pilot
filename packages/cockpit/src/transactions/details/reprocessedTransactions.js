import {
  applySpec,
  either,
  flatten,
  has,
  head,
  ifElse,
  map,
  mergeLeft,
  path,
  pick,
  pipe,
  pluck,
  prop,
  reverse,
  sortBy,
} from 'ramda'

const buildQuery = transactionId => JSON.stringify({
  query: {
    bool: {
      should: [
        {
          term: {
            transaction_id: transactionId,
          },
        },
        {
          term: {
            original_transaction_id: transactionId,
          },
        },
      ],
    },
  },
})

const getReprocessId = either(
  prop('transaction_id'),
  prop('id')
)

const getOriginalTransactionId = either(
  prop('original_transaction_id'),
  path(['metadata', 'pagarme_original_transaction_id'])
)

const formatReprocessedTransaction = applySpec({
  id: getReprocessId,
  status: prop('status'),
  original_transaction_id: getOriginalTransactionId,
})

const formatReprocessedTransactions = map(formatReprocessedTransaction)

const formatElasticSearchResponse = pipe(
  path(['hits', 'hits']),
  pluck('_source')
)
const getDate = ifElse(
  has('date_created'),
  prop('date_created'),
  prop('created_at')
)

const sortByDate = pipe(
  sortBy(getDate),
  reverse
)

const getReprocess = (client, transactionId) => client.search({
  type: 'reprocessed_transaction',
  query: buildQuery(transactionId),
})
  .then(formatElasticSearchResponse)
  .then(head)

const pickStatus = pick(['status'])

const getReprocessStatus = (client, reprocess) => client.transactions.find({
  id: reprocess.transaction_id,
})
  .then(pickStatus)
  .then(mergeLeft(reprocess))

const getReprocessWithStatus = (client, transactionId) => getReprocess(
  client,
  transactionId
)
  .then(reprocess => (
    reprocess
      ? getReprocessStatus(client, reprocess)
      : []
  ))

const findReprocessedTransactions = ({ client, transactionId }) => Promise.all([
  client.transactions.find({
    metadata: {
      pagarme_original_transaction_id: transactionId,
    },
  }),
  getReprocessWithStatus(client, transactionId),
])
  .then(flatten)
  .then(sortByDate)
  .then(formatReprocessedTransactions)
  .then(head)

export default findReprocessedTransactions
export { formatReprocessedTransaction }
