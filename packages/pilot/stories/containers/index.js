import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import RecipientListState from './RecipientList'
import ReportListState from './ReportList'
import ReportFilter from './ReportFilter'


storiesOf('Containers', module)
  .add('Recipient list', () => (
    <RecipientListState />
  ))
  .add('Report list', () => (
    <ReportListState />
  ))
  .add('ReportFilter', () => (
    <ReportFilter />
  ))

