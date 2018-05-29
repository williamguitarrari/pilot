import React from 'react'
import { action } from '@storybook/addon-actions'

import CardRefundResult from '../../../../src/containers/Refund/CardResult'

const t = translation => translation

const CardResult = () => (
  <CardRefundResult
    amount={200000}
    brand="Mastercard"
    cardFirstDigits="123456"
    cardLastDigits="4444"
    email="fulano.junior@pagar.me"
    holderName="Fulano de Oliveira Junior"
    installments={12}
    onTryAgain={action('try again')}
    onViewTransaction={action('on view transaction')}
    refundAmount="10000"
    status="success"
    statusMessage="A transação foi estornada com sucesso."
    t={t}
  />
)

export default CardResult
