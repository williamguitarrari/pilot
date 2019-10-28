import React from 'react'
import { Card } from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import PendingAnticipations from '../../../src/components/PendingAnticipations'

const requests = [
  {
    amount: 'R$ 2.342.342,50',
    created_at: '02/07',
    title: 'Saque',
  },
  {
    amount: 'R$ 2.300,00',
    created_at: '01/07',
    title: 'Antecipação',
  },
  {
    amount: 'R$ 200,00',
    created_at: '01/07',
    title: 'Antecipação',
  },
]
const PendingAnticipationsExample = () => (
  <Section>
    <Card>
      <PendingAnticipations
        emptyMessage="Nenhuma antecipação disponível"
        title="Antecipações pendentes"
        requests={requests}
        onCancel={action('cancel-request')}
      />
    </Card>
  </Section>
)

export default PendingAnticipationsExample
