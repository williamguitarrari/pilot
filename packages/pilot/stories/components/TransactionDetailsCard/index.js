import React from 'react'

import Section from '../../Section'
import TransactionDetailsCard from '../../../src/components/TransactionDetailsCard'

const labels = {
  tid: 'TID (ID da transação)',
  acquirer_name: 'Operadora do cartão',
  authorization_code: 'Código de autorização',
  acquirer_response_code: 'Resposta da operadora',
  antifraud_score: 'Score do antifraude',
  nsu: 'NSU',
  soft_descriptor: 'Soft Descriptor',
  subscription_id: 'ID da assinatura',
  capture_method: 'Método de captura',
}

const contents = {
  tid: '3122173',
  acquirer_name: 'Pagar.me',
  acquirer_response_code: null,
  authorization_code: 'SQ0BEW',
  antifraud_score: 12,
  nsu: 3122173,
  soft_descriptor: 'casajardimsec',
  subscription_id: null,
  capture_method: 'ecommerce',
}

const TransactionDetailsCardExample = () => (
  <Section>
    <TransactionDetailsCard
      title="detalhes da transação"
      labels={labels}
      contents={contents}
    />
  </Section>
)

export default TransactionDetailsCardExample
