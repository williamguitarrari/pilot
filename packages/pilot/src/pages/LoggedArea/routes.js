import Balance32 from 'emblematic-icons/svg/Extract32.svg'
import Configuration32 from 'emblematic-icons/svg/Configuration32.svg'
import Transaction32 from 'emblematic-icons/svg/Transaction32.svg'

import { Balance } from '../Balance'
import CompanySettings from '../CompanySettings'
import Transactions from '../Transactions'
import UserSettings from '../UserSettings'

export default {
  balance: {
    component: Balance,
    icon: Balance32,
    exact: true,
    path: '/balance/:id?',
    title: 'pages.balance.title',
  },
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
    hidden: true,
  },
  accountSettings: {
    title: 'settings.user.menu',
    path: '/account/settings',
    component: UserSettings,
    icon: Configuration32,
    exact: true,
    hidden: true,
  },
  companySettings: {
    title: 'settings.company.menu',
    path: '/settings',
    component: CompanySettings,
    icon: Configuration32,
    exact: true,
  },
}
