import React from 'react'
import { storiesOf } from '@storybook/react'

import RecipientListState from './RecipientList'
// import ReportList from './ReportList'
import ReportFilter from './ReportFilter'


storiesOf('Containers', module)
  .add('Recipient list', () => (
    <RecipientListState />
  ))
  .add('ReportFilter', () => (
    <ReportFilter />
  ))
