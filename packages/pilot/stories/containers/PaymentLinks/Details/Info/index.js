import React from 'react'
import { path, split } from 'ramda'
import Section from '../../../../Section'
import translations from '../../../../../public/locales/pt/translations.json'
import PaymentLinksInfo from '../../../../../src/containers/PaymentLinks/Details/Info'

const t = (sentence = '') => path(split('.', sentence), translations)

const PaymentLinksInfoExample = () => (
  <Section>
    <PaymentLinksInfo
      amount={30000}
      createdAt="2020-06-23T01:06:23.657Z"
      expiresAt="2020-07-03T01:06:23.650Z"
      t={t}
    />
  </Section>
)

export default PaymentLinksInfoExample
