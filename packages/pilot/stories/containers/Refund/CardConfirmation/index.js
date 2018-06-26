import React from 'react'
import { action } from '@storybook/addon-actions'
import CardRefundConfirmation from '../../../../src/containers/Refund/CardConfirmation'

const t = translation => translation

const CardConfirmation = () => (
  <CardRefundConfirmation
    amount={200000}
    brand="Mastercard"
    cardFirstDigits="123456"
    cardLastDigits="4444"
    email="fulano.junior@pagar.me"
    holderName="Fulano de Oliveira Junior"
    installments={12}
    onBack={action('back')}
    onConfirm={action('confirm')}
    refundAmount="10000"
    t={t}
  />
)

export default CardConfirmation
