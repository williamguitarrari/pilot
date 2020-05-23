import React from 'react'
import { identity } from 'ramda'
import { action } from '@storybook/addon-actions'

import Section from '../../../Section'
import NewLinksCard from '../../../../src/containers/PaymentLinks/NewLinksCard'

const NewLinksCardExample = () => (
  <Section>
    <NewLinksCard
      t={identity}
      onAddPaymentLink={action('onAddPaymentLink')}
    />
  </Section>
)

export default NewLinksCardExample
