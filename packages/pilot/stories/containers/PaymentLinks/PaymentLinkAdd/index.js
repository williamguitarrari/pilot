import React from 'react'
import { path, split } from 'ramda'
import { Modal } from 'former-kit'
import PaymentLinkResult from '../../../../src/containers/PaymentLinks/PaymentLinkAdd/Result'
import PaymentLinkFirstStep from '../../../../src/containers/PaymentLinks/PaymentLinkAdd/FirstStep'

import translations from '../../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

const PaymentLinkFirstStepExample = () => (
  <Modal isOpen>
    <PaymentLinkFirstStep t={t} />
  </Modal>
)

const PaymentLinkResultExample = () => (
  <Modal isOpen>
    <PaymentLinkResult t={t} paymentLink="link.pagar.me/tBy6bncOoN" />
  </Modal>
)

export default {
  PaymentLinkFirstStep: PaymentLinkFirstStepExample,
  PaymentLinkResult: PaymentLinkResultExample,
}
