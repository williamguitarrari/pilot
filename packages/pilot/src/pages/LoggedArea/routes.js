import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'
import Recipient32 from 'emblematic-icons/svg/Users32.svg'

import Transactions from '../Transactions'
import Recipient from '../Recipient'

export default {
  transactions: {
    title: 'transactions.list',
    path: '/transactions',
    component: Transactions,
    icon: Transaction32,
    exact: true,
  },
  transactionsDetails: {
    title: 'transactions.details',
    path: '/transactions/:id',
    exact: true,
  },
  recipients: {
    title: 'recipient.list',
    path: '/recipient',
    component: Recipient,
    icon: Recipient32,
    exact: true,
  },
  recipientsDetails: {
    title: 'recipient.detail',
    path: '/recipient/:id',
    exact: true,
  },
}
