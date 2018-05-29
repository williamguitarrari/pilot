import React from 'react'
import { action } from '@storybook/addon-actions'

import BoletoForm from '../../../../src/containers/Refund/BoletoForm'

const BoletoFormExample = () => (
  <BoletoForm
    amount={2000000}
    onSubmit={action('submit')}
    t={translation => translation}
  />
)

export default BoletoFormExample
