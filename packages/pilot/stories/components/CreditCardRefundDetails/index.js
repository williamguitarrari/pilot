import React from 'react'

import Section from '../../Section'
import CreditCardRefundDetails from '../../../src/components/CreditCardRefundDetails'

import style from './style.css'

const labels = {
  amount: 'Valor da transação',
  brand: 'Bandeira',
  cardNumber: 'Número do cartão',
  email: 'E-mail',
  holderName: 'Nome do cliente',
  installments: 'Número de parcelas',
  refundAmount: 'Valor do estorno',
}

const contents = {
  amount: 999999900,
  brand: 'Masterdcard',
  cardFirstDigits: '1234',
  cardLastDigits: '5678',
  email: 'fulano.silva@pagar.me',
  holderName: 'Fulano de tal da Silva',
  installments: '12',
  refundAmount: '2000000',
}

const BoletoRefundDetailsExample = () => (
  <Section className={style.section} >
    <CreditCardRefundDetails
      title="Dados do estorno"
      labels={labels}
      contents={contents}
    />
  </Section>
)

export default BoletoRefundDetailsExample
