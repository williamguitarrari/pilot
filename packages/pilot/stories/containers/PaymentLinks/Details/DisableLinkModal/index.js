import React from 'react'
import { path, split } from 'ramda'
import { action } from '@storybook/addon-actions'
import Section from '../../../../Section'
import translations from '../../../../../public/locales/pt/translations.json'
import DisableLinkModal from '../../../../../src/containers/PaymentLinks/Details/DisableLinkModal'

const t = (sentence = '') => path(split('.', sentence), translations)

const defaultProps = {
  isOpen: true,
  onCancelLink: action('onCancelLink'),
  onClose: action('onClose'),
  t,
}

const DisableLinkModalExample = () => (
  <Section>
    <DisableLinkModal {...defaultProps} />
  </Section>
)

export default DisableLinkModalExample
