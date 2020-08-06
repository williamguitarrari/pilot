import Promise from 'bluebird'
import {
  always,
  isNil,
  when,
  omit,
} from 'ramda'

import buildResult from './result'

const getValidStatus = when(
  isNil,
  always('available')
)

const ignoredProps = ['status', 'recipientId']

const data = client => (
  recipientId,
  shouldRequestAnticipations,
  query = {}
) => Promise.props({
  balance: client.balance.find({ recipientId }),
  bulk_anticipations_pending: shouldRequestAnticipations
    ? client.bulkAnticipations.find({
      recipientId,
      status: 'pending',
    })
    : Promise.resolve([]),
  recipient: client.recipients.find({ id: recipientId }),
  withdrawal: client.transfers.limits({ recipient_id: recipientId }),
}).then(buildResult({
  ...omit(ignoredProps, query),
  status: getValidStatus(query.status),
}))


export default data
