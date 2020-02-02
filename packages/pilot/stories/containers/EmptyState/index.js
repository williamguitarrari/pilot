import React from 'react'

import EmptyState from '../../../src/containers/EmptyState'
import Section from '../../Section'

const EmptyStateExample = () => (
  <Section>
    <EmptyState
      apiKey="api-key"
      encryptionKey="encryption-key"
      environment="live"
      fees={{
        anticipation: undefined,
        antifraud: 70,
        boleto: 380,
        gateway: undefined,
        installments: [
          { installment: 1, mdr: 1.2 },
          { installment: 2, mdr: 2.3 },
          { installment: 7, mdr: 3 },
        ],
        transfer: 187,
      }}
      t={t => t}
    />
  </Section>
)

export default EmptyStateExample
