import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import details from './Details'
import search from './Search'

import {
  TransactionDetails,
  TransactionsSearch,
} from './dynamicImports'

export const reducers = {
  details,
  search,
}

const TransactionsRouter = () => (
  <Switch>
    <Route
      component={TransactionDetails}
      exact
      path="/transactions/:id"
    />
    <Route
      path="/transactions"
      component={TransactionsSearch}
    />
  </Switch>
)

export default TransactionsRouter
