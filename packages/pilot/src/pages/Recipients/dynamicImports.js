import { lazy } from 'react'

const RecipientsSearch = lazy(() => import(
  /* webpackChunkName: "recipients" */ './Search/Search'
))

const RecipientDetail = lazy(() => import(
  /* webpackChunkName: "recipient-detail" */ './Detail'
))

const RecipientsAdd = lazy(() => import(
  /* webpackChunkName: "recipient-add" */ './Add'
))

export {
  RecipientDetail,
  RecipientsAdd,
  RecipientsSearch,
}
