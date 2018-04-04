import React from 'react'
import { storiesOf } from '@storybook/react'

import RecipientListState from './RecipientList'

storiesOf('Containers', module)
  .add('Recipient list', () => (
    <RecipientListState />
  ))
