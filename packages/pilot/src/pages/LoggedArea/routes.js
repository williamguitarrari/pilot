import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'
import Balance32 from 'emblematic-icons/svg/Extract32.svg'

import Transactions from '../Transactions'
import { Balance } from '../Balance'

export default {
  balance: {
    component: Balance,
    icon: Balance32,
    exact: true,
    path: '/balance/:id?',
    title: 'balance.title',
  },
  transactions: {
    component: Transactions,
    exact: true,
    icon: Transaction32,
    path: '/transactions',
    title: 'transactions.list',
  },
  transactionsDetails: {
    exact: true,
    hidden: true,
    path: '/transactions/:id',
    title: 'transactions.details',
  },
}
