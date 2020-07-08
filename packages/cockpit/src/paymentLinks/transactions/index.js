import { pluck, prop } from 'ramda'

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

  return paymentLinkTransactions.hits.hits.map(prop('_source'))
}

export default transactions
