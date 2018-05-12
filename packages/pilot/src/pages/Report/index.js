import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import ReportSearch from './Search'

const ReportRouter = () => (
  <Switch>
    <Route
      path="/report"
      component={ReportSearch}
    />
  </Switch>
)

export default ReportRouter

