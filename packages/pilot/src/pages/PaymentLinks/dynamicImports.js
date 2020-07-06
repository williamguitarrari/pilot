import { lazy } from 'react'

const PaymentLinksDetails = lazy(() => import(
  /* webpackChunkName: "payment-links-details" */ './Details/Details'
))

const PaymentLinksList = lazy(() => import(
  /* webpackChunkName: "payment-links" */ './List/List'
))

export {
  PaymentLinksDetails,
  PaymentLinksList,
}
