import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import details, { TransactionDetails } from './Details'
import search, { TransactionsSearch } from './Search'

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
      exact
      component={TransactionsSearch}
    />
  </Switch>
)

export default TransactionsRouter
