import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Grid,
  Row,
} from 'former-kit'
import NewLinksCard from './NewLinksCard'
import PaymentLinkAdd from './PaymentLinkAdd'
import PaymentLinksList from './PaymentLinksList'

const PaymentLinks = ({
  handleLinkFormChange,
  isNewLinkOpen,
  linkFormData,
  loadingCreateLink,
  loadingGetLinks,
  onAddPaymentLink,
  onClosePaymentLink,
  onCreateAnotherLink,
  onCreateLinkRequest,
  onNextStep,
  onOrderChange,
  onPageCountChange,
  onPageNumberChange,
  onPreviousStep,
  order,
  orderField,
  pageCount,
  pagination,
  paymentLinkUrl,
  paymentLinks,
  selectedPage,
  step,
  t,
}) => (
  <>
    <PaymentLinkAdd
      formData={linkFormData}
      isOpen={isNewLinkOpen}
      loading={loadingCreateLink}
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
        <Col
          desk={12}
          palm={12}
          tablet={12}
          tv={12}
        >
          <NewLinksCard onAddPaymentLink={onAddPaymentLink} t={t} />
        </Col>
      </Row>
      <Row>
        <Col
          desk={12}
          palm={12}
          tablet={12}
          tv={12}
        >
          <PaymentLinksList
            loading={loadingGetLinks}
            onPageCountChange={onPageCountChange}
            onPageChange={onPageNumberChange}
            onRowClick={() => {}}
            pageCount={pageCount}
            pagination={pagination}
            onOrderChange={onOrderChange}
            order={order}
            orderField={orderField}
            t={t}
            rows={paymentLinks}
            selectedPage={selectedPage}
          />
        </Col>
      </Row>
    </Grid>
  </>
)

PaymentLinks.propTypes = {
  handleLinkFormChange: PropTypes.func.isRequired,
  isNewLinkOpen: PropTypes.bool.isRequired,
  linkFormData: PropTypes.shape().isRequired,
  loadingCreateLink: PropTypes.bool.isRequired,
  loadingGetLinks: PropTypes.bool.isRequired,
  onAddPaymentLink: PropTypes.func.isRequired,
  onClosePaymentLink: PropTypes.func.isRequired,
  onCreateAnotherLink: PropTypes.func.isRequired,
  onCreateLinkRequest: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  onPageNumberChange: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderField: PropTypes.string.isRequired,
  pageCount: PropTypes.number.isRequired,
  pagination: PropTypes.shape().isRequired,
  paymentLinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  paymentLinkUrl: PropTypes.string.isRequired,
  selectedPage: PropTypes.number.isRequired,
  step: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default PaymentLinks
