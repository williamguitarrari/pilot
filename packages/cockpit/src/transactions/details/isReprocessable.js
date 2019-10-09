import moment from 'moment'

const canReprocess = (transaction, data) => {
  if (transaction.status !== 'refused') {
    return false
  }

  if (transaction.subscription_id) {
    return false
  }

  if (transaction.payment_method !== 'credit_card') {
    return false
  }

  if (moment(transaction.date_created).isBefore(moment().subtract(3, 'days'))) {
    return false
  }

  if (typeof transaction.metadata.pagarme_original_transaction_id !== 'undefined') {
    return false
  }

  return data.length === 0
}

const isReprocessable = (transaction, data) => {
  const canReprocessTransaction = canReprocess(transaction, data)

  return canReprocessTransaction && transaction.status !== 'processing'
}

export default isReprocessable
