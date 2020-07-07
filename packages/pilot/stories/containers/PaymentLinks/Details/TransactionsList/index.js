import React from 'react'
import { path, split } from 'ramda'
import Section from '../../../../Section'
import translations from '../../../../../public/locales/pt/translations.json'
import TransactionsList from '../../../../../src/containers/PaymentLinks/Details/TransactionsList'
import transactionsMock from './transactionMock'

const t = (sentence = '') => path(split('.', sentence), translations)

const WithRows = () => (
  <Section>
    <TransactionsList
      t={t}
      rows={[
        transactionsMock,
        transactionsMock,
        transactionsMock,
      ]}
    />
  </Section>
)

const WhenEmpty = () => (
  <Section>
    <TransactionsList
      t={t}
      rows={[]}
    />
  </Section>
)

const WhenLoading = () => (
  <Section>
    <TransactionsList
      loading
      t={t}
    />
  </Section>
)

export default {
  WhenEmpty,
  WhenLoading,
  WithRows,
}
