import React from 'react'
import { storiesOf } from '@storybook/react'

import Balance from './Balance'
import RecipientListState from './RecipientList'

storiesOf('Containers', module)
  .add('Recipient list', () => (
    <RecipientListState />
  ))
  .add('Balance', () => (
    <Balance />
  ))
