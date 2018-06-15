import React from 'react'
import { Card } from 'former-kit'
import Section from '../../Section'
import ReprocessDetails from '../../../src/components/ReprocessDetails'

const labels = {
  amount: 'Valor R$',
  cardNumber: 'Número do cartão',
  holderName: 'Portador do cartão',
  installments: 'Qtd de parcelas',
}

const contents = {
  amount: '20.000,00',
  cardNumber: '1234 **** **** 4444',
  holderName: 'José da Silva',
  installments: 'Qtd de parcelas',
}

const ReprocessDetailsExample = () => (
  <Section>
    <Card>
      <ReprocessDetails
        contents={contents}
        id={123456}
        labels={labels}
      />
    </Card>
  </Section>
)

export default ReprocessDetailsExample
