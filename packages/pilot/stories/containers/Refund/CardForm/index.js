import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import CardFormRefund from '../../../../src/containers/Refund/CardForm'

const t = translations => translations

const CardForm = () => (
  <Card>
    <CardFormRefund
      amount={21312}
      brand="visa"
      cardBrand="visa"
      cardFirstDigits="123456"
      cardLastDigits="4444"
      email="jose@dasilva.com"
      holderName="José da Silva"
      installments={12}
      onConfirm={action('confirm')}
      t={t}
    />
  </Card>
)

export default CardForm
