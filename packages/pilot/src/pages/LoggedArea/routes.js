import HeartRate32 from 'emblematic-icons/svg/HeartRate32.svg'
import Wrench32 from 'emblematic-icons/svg/Wrench32.svg'
import Home32 from 'emblematic-icons/svg/Home32.svg'
import Checkout32 from 'emblematic-icons/svg/Checkout32.svg'
import Withdraw32 from 'emblematic-icons/svg/Withdraw32.svg'
import Anticipation32 from 'emblematic-icons/svg/Anticipation32.svg'
import Link32 from 'emblematic-icons/svg/Link32.svg'

import {
  Anticipation,
  Balance,
  CompanySettings,
  EmptyState,
  Home,
  Recipients,
  Transactions,
  UserSettings,
  Withdraw,
  PaymentLinks,
} from './dynamicImports'

/* eslint-disable sort-keys */
export default {
  accountSettings: {
    component: UserSettings,
    exact: true,
    hidden: true,
    icon: Wrench32,
    path: '/account',
    title: 'pages.settings.user.menu',
  },
  anticipation: {
    component: Anticipation,
    exact: true,
    hidden: true,
    icon: HeartRate32,
    path: '/anticipation/:id?',
    title: 'pages.anticipation.title',
  },
  home: {
    component: Home,
    exact: true,
    dafaultRoute: true,
    icon: Home32,
    path: '/home',
    title: 'pages.home.title',
  },
  balance: {
    component: Balance,
    exact: true,
    icon: HeartRate32,
    path: '/balance/:id?',
    title: 'pages.balance.title',
  },
  transactions: {
    component: Transactions,
    exact: true,
    icon: Checkout32,
    path: '/transactions',
    title: 'pages.transactions.title',
  },
  paymentLinks: {
    component: PaymentLinks,
    exact: true,
    hidden: false,
    path: '/payment-links',
    title: 'pages.payment_links.title',
    icon: Link32,
  },
  paymentLinksDetails: {
    exact: true,
    hidden: true,
    path: '/payment-links/:id',
    title: 'pages.payment_link_detail.title',
  },
  transactionsDetails: {
    exact: true,
    hidden: true,
    path: '/transactions/:id',
    title: 'pages.transaction.title',
  },
  withdrawRoot: {
    component: Withdraw,
    hidden: true,
    icon: Withdraw32,
    path: '/withdraw/:id?',
    title: 'pages.withdraw.title',
  },
  recipients: {
    validateVisibility: ({
      allow_manage_recipient: allowManageRecipient,
    }) => !!allowManageRecipient,
    hidden: false,
    title: 'pages.recipients.title',
    path: '/recipients',
    component: Recipients,
    icon: Anticipation32,
    exact: true,
  },
  recipientsAdd: {
    hidden: true,
    path: '/recipients/add',
    title: 'pages.add_recipient.title',
  },
  recipientsDetail: {
    hidden: true,
    path: '/recipients/detail',
    title: 'pages.recipient_detail.title',
  },
  emptyState: {
    component: EmptyState,
    hidden: true,
    path: '/welcome',
    title: 'pages.empty_state.title',
  },
  companySettings: {
    component: CompanySettings,
    exact: true,
    icon: Wrench32,
    path: '/settings',
    title: 'pages.settings.company.menu',
  },
}

/* eslint-enable sort-keys */
