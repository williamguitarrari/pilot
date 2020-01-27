import React from 'react'
import { identity } from 'ramda'

import Section from '../../Section'
import PaymentLinkMetrics from '../../../src/containers/PaymentLinks/Metrics'
import { totalAmountByWeekday } from './mocks'

const loading = {
  metrics: false,
}

const PaymentLinkMetricsExample = () => (
  <Section>
    <PaymentLinkMetrics
      localLoading={loading}
      t={identity}
      totalAmountByWeekday={totalAmountByWeekday}
      totalAmountLinksPaid={1070000}
      totalLinksPaid={40}
    />
  </Section>
)

export default PaymentLinkMetricsExample
