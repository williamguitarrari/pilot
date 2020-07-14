import { applySpec, map, path, pluck, pipe, prop } from 'ramda'
import { transactionSpec } from '../../transactions/shared'

const mapSourceToTableRows = applySpec(transactionSpec)

const buildTransactions = pipe(
  path(['hits', 'hits']),
  map(pipe(
    prop('_source'),
    mapSourceToTableRows
  ))
)

const transactions = client => async (paymentLinkId) => {
  const orders = await client.orders.all({
    payment_link_id: paymentLinkId,
  })

  const orderIds = pluck('id', orders)

  const paymentLinkTransactions = await client.search({
    query: JSON.stringify({
      query: {
        bool: {
          must: [
            { terms: { order_id: orderIds } },
          ],
        },
      },
      size: 255,
      sort: [{
        date_created: 'asc',
      }],
    }),
    type: 'transaction',
  })

  return buildTransactions(paymentLinkTransactions)
}

export default transactions
