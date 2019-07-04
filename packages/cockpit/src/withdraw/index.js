import { path } from 'ramda'
import env from '../environment'

const getRecipientById = (id, client) => (
  Promise.all([
    client.recipients.find({ id }),
    client.balance.find({ recipientId: id }),
    client.transfers.limits({ recipient_id: id }),
  ])
    .then(([recipientData, balance, limits]) => (
      { ...recipientData, balance, limits }
    ))
)

const getDefaultRecipient = client => client
  .company.current()
  .then(path(['default_recipient_id', env]))
  .then(id => getRecipientById(id, client))

const withdraw = client => (id) => {
  if (id) {
    return getRecipientById(id, client)
  }

  return getDefaultRecipient(client)
}

export default withdraw
