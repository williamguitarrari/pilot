import {
  applySpec,
  either,
  flatten,
  has,
  ifElse,
  map,
  path,
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

const findReprocessedTransactions = ({ client, transactionId }) => Promise.all([
  client.transactions.find({
    metadata: {
      pagarme_original_transaction_id: transactionId,
    },
  }),
  client.search({
    type: 'reprocessed_transaction',
    query: buildQuery(transactionId),
  }).then(formatElasticSearchResponse),
])
  .then(flatten)
  .then(sortByDate)
  .then(formatReprocessedTransactions)

export default findReprocessedTransactions
export {
  formatReprocessedTransaction,
  formatReprocessedTransactions,
}
