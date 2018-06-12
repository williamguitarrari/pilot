import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'
import Configuration32 from 'emblematic-icons/svg/Configuration32.svg'

import Transactions from '../Transactions'
import CompanySettings from '../CompanySettings'

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
  companySettings: {
    title: 'settings.company.menu',
    path: '/settings',
    component: CompanySettings,
    icon: Configuration32,
    exact: true,
  },
}
