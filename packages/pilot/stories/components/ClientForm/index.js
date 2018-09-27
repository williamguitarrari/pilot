import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../Section'
import ClientForm from '../../../src/components/ClientForm'

const ClientFormExample = () => (
  <Section>
    <Card>
      <ClientForm
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

export default ClientFormExample
