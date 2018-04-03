import React from 'react'

import Section from '../../Section'
import CustomerCard from '../../../src/components/CustomerCard'

const labels = {
  name: 'Nome do cliente',
  document_number: 'CPF/CNPJ',
  born_at: 'Data de nascimento',
  gender: 'Genero',
  phone: 'Telefone',
  email: 'E-mail',
  zip_code: 'CEP',
  street: 'Rua',
  number: 'N',
  complement: 'Complemento',
  neighborhood: 'Bairro',
  city: 'Cidade',
  state: 'Estado',
}

const contents = {
  name: 'José dos Santos',
  document_number: '12345678910',
  born_at: '21/12/1970',
  gender: null,
  phone: '(11) 90101-0101',
  email: 'email@pagar.me',
  zip_code: '12.345-67',
  street: 'Rua Gomes de Carvalho',
  number: '1609',
  complement: 'apto 101',
  neighborhood: 'Rivendell',
  city: 'Middle Earth',
  state: 'SP',
}

const CustomerCardExample = () => (
  <Section>
    <CustomerCard
      title="Detalhes do cliente"
      labels={labels}
      contents={contents}
    />
  </Section>
)

export default CustomerCardExample
