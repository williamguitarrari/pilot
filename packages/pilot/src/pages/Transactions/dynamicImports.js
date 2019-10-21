import { lazy } from 'react'

const TransactionDetails = lazy(() => import(
  /* webpackChunkName: "transaction-details" */ './Details/Details'
))

const TransactionsSearch = lazy(() => import(
  /* webpackChunkName: "transactions" */ './Search/Search'
))

export {
  TransactionDetails,
  TransactionsSearch,
}
