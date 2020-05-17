import React from 'react'
import { path, split } from 'ramda'
import { Modal } from 'former-kit'
import PaymentLinkResult from '../../../../src/containers/PaymentLinks/PaymentLinkAdd/Result'

import translations from '../../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

const PaymentLinkResultExample = () => (
  <Modal isOpen>
    <PaymentLinkResult t={t} paymentLink="link.pagar.me/tBy6bncOoN" />
  </Modal>
)

// eslint-disable-next-line import/prefer-default-export
export default { PaymentLinkResult: PaymentLinkResultExample }
