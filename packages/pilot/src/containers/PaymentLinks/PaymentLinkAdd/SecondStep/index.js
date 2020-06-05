import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  BulletSteps,
  Button,
  Flexbox,
  ModalActions,
  ModalContent,
  ModalTitle,
} from 'former-kit'
import Form from 'react-vanilla-form'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import renderBoletoInput from './BoletoInput'
import renderCreditCardInput from './CreditCardInput'
import {
  validateBoletoExpiration,
  validateFeesPercentage,
  validateRequiredField,
} from './validators'
import styles from './style.css'

const boletoInputDefaultValues = {
  expiration_boleto: undefined,
}

const creditCardInputDefaultValues = {
  fees_percentage: '0',
  max_installments: undefined,
  transfer_fees: undefined,
}

const SecondStep = ({
  onBack, onClose, onSubmit, t,
}) => {
  const [formData, setFormData] = useState({
    boleto: false,
    credit_card: false,
    ...boletoInputDefaultValues,
    ...creditCardInputDefaultValues,
  })
  const [isPaymentMethodEnabled, setIsPaymentMethodEnabled] = useState(false)

  const onFormChange = (newData) => {
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

    setIsPaymentMethodEnabled(newFormData.boleto || newFormData.credit_card)
    setFormData(newFormData)
  }

  return (
    <>
      <ModalTitle
        title={t('pages.payment_links.add_link.second_step.title')}
        titleAlign="start"
        closeIcon={<IconClose width={12} height={12} />}
        onClose={onClose}
      />
      <Form
        data={formData}
        onChange={onFormChange}
        onSubmit={onSubmit}
        validateOn="onBlur"
        validation={{
          expiration_boleto: validateBoletoExpiration(formData.boleto, t),
          fees_percentage: validateRequiredField(formData.credit_card, t),
          max_installments: validateRequiredField(formData.credit_card, t),
          transfer_fees: validateFeesPercentage(formData.credit_card, t),
        }}
      >
        <ModalContent>
          {renderBoletoInput(formData, t)}
          {renderCreditCardInput(formData, t)}
        </ModalContent>
        <ModalActions>
          <Flexbox className={styles.paymentLinkActions} justifyContent="center">
            <div className={styles.secondStepActions}>
              <Button fill="outline" onClick={onBack}>
                {t('go_back')}
              </Button>
              <Button disabled={!isPaymentMethodEnabled} fill="flat" type="submit">
                {t('finish')}
              </Button>
            </div>
            <BulletSteps
              status={[
                { id: 'firstStep', status: 'previous' },
                { id: 'secondStep', status: 'current' },
              ]}
              steps={[{ id: 'firstStep' }, { id: 'secondStep' }]}
            />
          </Flexbox>
        </ModalActions>
      </Form>
    </>
  )
}

SecondStep.propTypes = {
  onBack: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  t: PropTypes.func.isRequired,
}

SecondStep.defaultProps = {
  onBack: () => {},
  onClose: () => {},
  onSubmit: () => {},
}

export default SecondStep
