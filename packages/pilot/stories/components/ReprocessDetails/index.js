import React from 'react'
import {
  Card,
  CardContent,
} from 'former-kit'
import Section from '../../Section'
import ReprocessDetails from '../../../src/components/ReprocessDetails'

const labels = {
  amount: 'Valor',
  holderName: 'Portador do cartão',
  transactionId: 'Transação',
}

const contents = {
  amount: 'R$ 20.000,00',
  holderName: 'José da Silva',
  transactionId: '#1234567',
}

const ReprocessDetailsExample = () => (
  <Section>
    <Card>
      <CardContent>
        <ReprocessDetails
          contents={contents}
          id={123456}
          labels={labels}
        />
      </CardContent>
    </Card>
  </Section>
)

export default ReprocessDetailsExample
