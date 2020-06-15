import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
  createLink as createLinkAction,
  requestNextStep as requestNextStepAction,
  requestPreviousStep as requestPreviousStepAction,
  requestResetStatus as requestResetStatusAction,
} from './actions'
import PaymentLinksContainer from '../../containers/PaymentLinks'

const mapStateToProps = ({
  paymentLinks: {
    loading,
    step,
  },
}) => ({
  loading, step,
})

const mapDispatchToProps = {
  createLink: createLinkAction,
  requestNextStep: requestNextStepAction,
  requestPreviousStep: requestPreviousStepAction,
  requestResetStatus: requestResetStatusAction,
}

const enhanced = compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)

const firstStepDefaultData = {
  amount: '0',
  expiration_unit: 'days',
}

const boletoInputDefaultValues = {
  boleto_expires_in: undefined,
}

const creditCardInputDefaultValues = {
  free_installments: undefined,
  interest_rate: '0',
  max_installments: undefined,
}

const makeDefaulLinkData = () => ({
  boleto: false,
  credit_card: false,
  ...firstStepDefaultData,
  ...boletoInputDefaultValues,
  ...creditCardInputDefaultValues,
})

const steps = {
  error_step: {
    name: 'error_step',
    title: 'pages.payment_links.add_link.error.title',
  },
  first_step: {
    name: 'first_step',
    title: 'pages.payment_links.add_link.first_step.title',
  },
  second_step: {
    name: 'second_step',
    title: 'pages.payment_links.add_link.second_step.title',
  },
  success_step: {
    name: 'success_step',
    title: 'pages.payment_links.add_link.success.title',
  },
}

const PaymentLinks = ({
  createLink,
  loading,
  requestNextStep,
  requestPreviousStep,
  requestResetStatus,
  step,
  t,
}) => {
  const [linkFormData, setLinkFormData] = useState(makeDefaulLinkData())
  const [isNewLinkOpen, setIsNewLinkOpen] = useState(false)

  const handleLinkFormChange = (newData) => {
    let newFormData = { ...newData }

    if (newFormData.max_installments !== linkFormData.max_installments) {
      newFormData = Object.assign(
        newFormData,
        creditCardInputDefaultValues,
        { max_installments: newFormData.max_installments }
      )
    }

    if (!newFormData.boleto) {
      newFormData = Object.assign(
        newFormData,
        boletoInputDefaultValues
      )
    }

    if (!newFormData.credit_card) {
      newFormData = Object.assign(
        newFormData,
        creditCardInputDefaultValues
      )
    }

    setLinkFormData(newFormData)
  }

  const onAddPaymentLink = () => setIsNewLinkOpen(true)

  const onCreateLinkRequest = () => {
    createLink()
  }

  const onClosePaymentLink = () => {
    setLinkFormData(makeDefaulLinkData())
    requestResetStatus()
    setIsNewLinkOpen(false)
  }

  const onCreateAnotherLink = () => {
    setLinkFormData(makeDefaulLinkData())
    requestResetStatus()
  }

  return (
    <PaymentLinksContainer
      linkFormData={linkFormData}
      loading={loading}
      isNewLinkOpen={isNewLinkOpen}
      handleLinkFormChange={handleLinkFormChange}
      onAddPaymentLink={onAddPaymentLink}
      onClosePaymentLink={onClosePaymentLink}
      onCreateLinkRequest={onCreateLinkRequest}
      onCreateAnotherLink={onCreateAnotherLink}
      onNextStep={requestNextStep}
      onPreviousStep={requestPreviousStep}
      step={steps[step]}
      t={t}
    />
  )
}

PaymentLinks.propTypes = {
  createLink: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  requestNextStep: PropTypes.func.isRequired,
  requestPreviousStep: PropTypes.func.isRequired,
  requestResetStatus: PropTypes.func.isRequired,
  step: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(PaymentLinks)
