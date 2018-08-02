import React from 'react'
import { action } from '@storybook/addon-actions'

import Pricing
  from '../../../../../../src/containers/Settings/Company/GeneralInfoTab/Pricing'

const rows = [
  {
    cost: '50',
    description: 'Cartão de Crédito',
    title: 'Gateway',
    unit: 'R$',
  },
  {
    cost: '3',
    description: 'Antecipação',
    title: 'PSP',
    unit: '%',
  },
  {
    cost: '0',
    description: 'Taxa de serviço',
    title: 'Antifraude',
    unit: '%',
  },
  {
    cost: '367',
    description: 'DOC',
    title: 'Transferências',
    unit: 'R$',
  },
]

const PricingExample = () => (
  <Pricing
    onOrderChange={action('order')}
    pricing={rows}
    t={t => t}
  />
)

export default PricingExample
