import React from 'react'

import EmptyState from '../../../src/containers/EmptyState'
import Section from '../../Section'

const EmptyStateExample = () => (
  <Section>
    <EmptyState
      apiKey="api-key"
      encryptionKey="encryption-key"
      environment="live"
      t={t => t}
    />
  </Section>
)

export default EmptyStateExample
