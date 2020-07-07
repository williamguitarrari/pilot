import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import list, { epic as listEpic } from './List'
import details, { epic as detailsEpic } from './Details'

import {
  PaymentLinksDetails,
  PaymentLinksList,
} from './dynamicImports'

export const reducers = {
  details,
  list,
}

export const epics = {
  details: detailsEpic,
  list: listEpic,
}

const PaymentLinksRouter = () => (
  <Switch>
    <Route
      component={PaymentLinksDetails}
      exact
      path="/payment-links/:id"
    />
    <Route
      path="/payment-links"
      component={PaymentLinksList}
    />
  </Switch>
)

export default PaymentLinksRouter
