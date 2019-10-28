import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import search from './Search'

import {
  RecipientDetail,
  RecipientsAdd,
  RecipientsSearch,
} from './dynamicImports'

export const reducers = {
  search,
}

const RecipientsRouter = () => (
  <Switch>
    <Route
      path="/recipients/detail/:id"
      component={RecipientDetail}
    />
    <Route
      path="/recipients/add"
      component={RecipientsAdd}
    />
    <Route
      path="/recipients"
      component={RecipientsSearch}
    />
  </Switch>
)

export default RecipientsRouter
