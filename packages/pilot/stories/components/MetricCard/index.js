import React from 'react'

import Section from '../../Section'
import MetricCard from '../../../src/components/MetricCard'
import Icon from './line-chart-icon.svg'

const MetricCardExample = () => (
  <Section>
    <MetricCard
      icon={<Icon />}
      title="Ticket médio"
      value="R$ 250,00"
    />
  </Section>
)

export default MetricCardExample
