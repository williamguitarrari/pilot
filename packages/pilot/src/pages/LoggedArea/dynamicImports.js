import { lazy } from 'react'

const UserSettings = lazy(() => import(
  /* webpackChunkName: "user-settings" */ '../UserSettings'
))

const Anticipation = lazy(() => import(
  /* webpackChunkName: "anticipation" */ '../Anticipation/Anticipation'
))

const Home = lazy(() => import(
  /* webpackChunkName: "home" */ '../Home/Home'
))

const Balance = lazy(() => import(
  /* webpackChunkName: "balance" */ '../Balance/Balance'
))

const Transactions = lazy(() => import(
  /* webpackChunkName: "transactions" */ '../Transactions'
))

const CompanySettings = lazy(() => import(
  /* webpackChunkName: "company-settings" */ '../CompanySettings'
))

const Withdraw = lazy(() => import(
  /* webpackChunkName: "withdraw" */ '../Withdraw'
))

const Recipients = lazy(() => import(
  /* webpackChunkName: "recipients" */ '../Recipients'
))

export {
  Anticipation,
  Balance,
  CompanySettings,
  Home,
  Recipients,
  Transactions,
  UserSettings,
  Withdraw,
}
