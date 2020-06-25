import React from 'react'
import { path, split } from 'ramda'
import { action } from '@storybook/addon-actions'
import Section from '../../../../Section'
import translations from '../../../../../public/locales/pt/translations.json'
import DetailsHeader from '../../../../../src/containers/PaymentLinks/Details/Header'

const t = (sentence = '') => path(split('.', sentence), translations)

const defaultProps = {
  name: 'Camisetas em promoção',
  onPaymentLinkCancel: action('onPaymentLinkCancel'),
  url: 'link.pagar.me/tBy6bncOoN',
}

const ActiveLink = () => (
  <Section>
    <DetailsHeader
      {...defaultProps}
      status="active"
      t={t}
    />
  </Section>
)

const InactiveLink = () => (
  <Section>
    <DetailsHeader
      {...defaultProps}
      status="expired"
      t={t}
    />
  </Section>
)

export default {
  ActiveLink,
  InactiveLink,
}
