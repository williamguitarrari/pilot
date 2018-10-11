import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../Section'
import CustomerForm from '../../../src/containers/CreateTransaction/Customers/CustomerForm'

const CustomerFormExample = () => (
  <Section>
    <Card>
      <CustomerForm
        customer={{
          type: 'individual',
        }}
        onCancel={action('cancel')}
        onChange={action('change')}
        onSubmit={action('submit')}
        t={t => t}
      />
    </Card>
  </Section>
)

export default CustomerFormExample
