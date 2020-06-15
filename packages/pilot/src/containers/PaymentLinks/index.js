import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
} from 'former-kit'
import NewLinksCard from './NewLinksCard'
import PaymentLinkAdd from './PaymentLinkAdd'

const PaymentLinks = ({
  handleLinkFormChange,
  isNewLinkOpen,
  linkFormData,
  loading,
  onAddPaymentLink,
  onClosePaymentLink,
  onCreateAnotherLink,
  onCreateLinkRequest,
  onNextStep,
  onPreviousStep,
  paymentLinkUrl,
  step,
  t,
}) => (
  <>
    <PaymentLinkAdd
      formData={linkFormData}
      isOpen={isNewLinkOpen}
      loading={loading}
      handleFormChange={handleLinkFormChange}
      onClose={onClosePaymentLink}
      onCreateAnotherLink={onCreateAnotherLink}
      onCreateLinkRequest={onCreateLinkRequest}
      onNextStep={onNextStep}
      onPreviousStep={onPreviousStep}
      paymentLink={paymentLinkUrl}
      step={step}
      t={t}
    />
    <Grid>
      <Row>
        <NewLinksCard onAddPaymentLink={onAddPaymentLink} t={t} />
      </Row>
    </Grid>
  </>
)

PaymentLinks.propTypes = {
  handleLinkFormChange: PropTypes.func.isRequired,
  isNewLinkOpen: PropTypes.bool.isRequired,
  linkFormData: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  onAddPaymentLink: PropTypes.func.isRequired,
  onClosePaymentLink: PropTypes.func.isRequired,
  onCreateAnotherLink: PropTypes.func.isRequired,
  onCreateLinkRequest: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired,
  paymentLinkUrl: PropTypes.string.isRequired,
  step: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default PaymentLinks
