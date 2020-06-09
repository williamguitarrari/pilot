import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  BulletSteps,
  Modal,
  ModalTitle,
} from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import FirstStep from './FirstStep/FirstStep'
import SecondStep from './SecondStep'
import SuccessStep from './SuccessStep'
import ErrorStep from './ErrorStep'

const renderBulletSteps = (currentStep) => {
  const status = currentStep === 'first_step'
    ? [
      { id: 'firstStep', status: 'current' },
      { id: 'secondStep', status: 'next' },
    ]
    : [
      { id: 'firstStep', status: 'previous' },
      { id: 'secondStep', status: 'current' },
    ]

  return (
    <BulletSteps
      status={status}
      steps={[{ id: 'firstStep' }, { id: 'secondStep' }]}
    />
  )
}

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

const PaymentLinkAdd = ({
  isOpen,
  loading,
  onClose,
  onCreateAnotherLink,
  onCreateLinkRequest,
  onNextStep,
  onPreviousStep,
  paymentLink,
  step,
  t,
}) => {
  const [formData, setFormData] = useState({
    boleto: false,
    credit_card: false,
    ...firstStepDefaultData,
    ...boletoInputDefaultValues,
    ...creditCardInputDefaultValues,
  })

  const handleFormChange = (newData) => {
    let newFormData = { ...newData }

    if (newFormData.max_installments !== formData.max_installments) {
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

    setFormData(newFormData)
  }

  return (
    <Modal isOpen={isOpen} size="small">
      <ModalTitle
        title={step.title}
        titleAlign="start"
        closeIcon={<IconClose width={12} height={12} />}
        onClose={() => !loading && onClose()}
      />
      {
          step.name === 'first_step' && (
          <FirstStep
            formData={formData}
            onChange={handleFormChange}
            onSubmit={onNextStep}
            t={t}
            renderBulletSteps={renderBulletSteps}
          />
          )
      }
      {
        step.name === 'second_step' && (
          <SecondStep
            formData={formData}
            loading={loading}
            onBack={onPreviousStep}
            onChange={handleFormChange}
            onSubmit={onCreateLinkRequest}
            t={t}
            renderBulletSteps={renderBulletSteps}
          />
        )
      }
      {
        step.name === 'success_step' && (
          <SuccessStep
            onCreateAnotherLink={onCreateAnotherLink}
            paymentLink={paymentLink}
            t={t}
          />
        )
      }
      {
        step.name === 'error_step' && (
          <ErrorStep
            onCreateAnotherLink={onCreateAnotherLink}
            t={t}
          />
        )
      }
    </Modal>
  )
}

PaymentLinkAdd.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onCreateAnotherLink: PropTypes.func,
  onCreateLinkRequest: PropTypes.func,
  onNextStep: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired,
  paymentLink: PropTypes.string,
  step: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

PaymentLinkAdd.defaultProps = {
  onClose: () => {},
  onCreateAnotherLink: () => {},
  onCreateLinkRequest: () => {},
  paymentLink: null,
}

export default PaymentLinkAdd
