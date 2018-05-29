import cleanTransaction from './cleanTransaction'

const reprocess = client => transactionId => client
  .transactions
  .find({ id: transactionId })
  .then(cleanTransaction)
  .then(client.transactions.create)

export default reprocess
