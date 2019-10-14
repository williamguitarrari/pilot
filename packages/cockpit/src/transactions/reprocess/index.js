import cleanTransaction from './cleanTransaction'

const reprocessWithAntifraud = client => transactionId => client
  .transactions
  .find({ id: transactionId })
  .then(cleanTransaction)
  .then(client.transactions.create)

export default reprocessWithAntifraud
