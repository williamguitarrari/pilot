import React from 'react'
import { identity } from 'ramda'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import PaymentLinkHeader from '../../../src/containers/PaymentLinks/Header'

const PaymentLinkHeaderExample = () => (
  <Section>
    <PaymentLinkHeader
      t={identity}
      onAddPaymentLink={action('onAddPaymentLink')}
    />
  </Section>
)

export default PaymentLinkHeaderExample
