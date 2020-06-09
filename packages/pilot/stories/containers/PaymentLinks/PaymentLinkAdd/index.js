import React, { useState } from 'react'
import { path, split } from 'ramda'
import { action } from '@storybook/addon-actions'
import PaymentLinkAdd from '../../../../src/containers/PaymentLinks/PaymentLinkAdd'

import translations from '../../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

const steps = {
  error_step: {
    name: 'error_step',
    title: 'Erro na criação do link',
  },
  first_step: {
    name: 'first_step',
    title: 'Criar link de pagamentos',
  },
  second_step: {
    name: 'second_step',
    title: 'Meios de pagamento',
  },
  success_step: {
    name: 'success_step',
    title: 'Link criado com sucesso!',
  },
}

const PaymentLinkAddExample = () => {
  const [step, setStep] = useState(steps.first_step)
  const [loading, setLoading] = useState(false)
  const paymentLink = 'link.pagar.me/tBy6bncOoN'

  const onCreateLinkRequest = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(steps.success_step)
    }, 2000)
  }

  const onCreateAnotherLink = () => setStep(steps.first_step)
  const onNextStep = () => setStep(steps.second_step)
  const onPreviousStep = () => setStep(steps.first_step)

  return (
    <PaymentLinkAdd
      loading={loading}
      isOpen
      onNextStep={onNextStep}
      onPreviousStep={onPreviousStep}
      onCreateAnotherLink={onCreateAnotherLink}
      onCreateLinkRequest={onCreateLinkRequest}
      paymentLink={paymentLink}
      step={step}
      t={t}
    />
  )
}

const baseProps = {
  isOpen: true,
  loading: false,
  onCreateAnotherLink: action('onCreateAnotherLink'),
  onCreateLinkRequest: action('onCreateLinkRequests'),
  onNextStep: action('onNextStep'),
  onPreviousStep: action('onPreviousStep'),
  paymentLink: 'link.pagar.me/tBy6bncOoN',
  t,
}

const PaymentLinkFirstStepExample = () => (
  <PaymentLinkAdd {...baseProps} step={steps.first_step} />
)

const PaymentLinkSecondStepExample = () => (
  <PaymentLinkAdd {...baseProps} step={steps.second_step} />
)

const PaymentLinkSuccessStepExample = () => (
  <PaymentLinkAdd {...baseProps} step={steps.success_step} />
)

const PaymentLinkErrorStepExample = () => (
  <PaymentLinkAdd {...baseProps} step={steps.error_step} />
)

export default {
  PaymentLinkAddModal: PaymentLinkAddExample,
  PaymentLinkErrorStep: PaymentLinkErrorStepExample,
  PaymentLinkFirstStep: PaymentLinkFirstStepExample,
  PaymentLinkSecondStep: PaymentLinkSecondStepExample,
  PaymentLinkSuccessStep: PaymentLinkSuccessStepExample,
}
