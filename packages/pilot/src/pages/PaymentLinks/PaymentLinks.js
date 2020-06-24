import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
  createLinkRequest as createLinkRequestAction,
  nextStepRequest as nextStepRequestAction,
  previousStepRequest as previousStepRequestAction,
  resetStepsRequest as resetStepsRequestAction,
  getLinksRequest as getLinksRequestAction,
} from './actions'
import PaymentLinksContainer from '../../containers/PaymentLinks'
import { withError } from '../ErrorBoundary'

const mapStateToProps = ({
  paymentLinks: {
    filter,
    loadingCreateLink,
    loadingGetLinks,
    paymentLinkUrl,
    paymentLinks,
    step,
    totalPaymentLinks,
  },
}) => ({
  filter,
  loadingCreateLink,
  loadingGetLinks,
  paymentLinks,
  paymentLinkUrl,
  step,
  totalPaymentLinks,
})

const mapDispatchToProps = {
  createLinkRequest: createLinkRequestAction,
  getLinksRequest: getLinksRequestAction,
  nextStepRequest: nextStepRequestAction,
  previousStepRequest: previousStepRequestAction,
  resetStepsRequest: resetStepsRequestAction,
}

const enhanced = compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withError
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
  createLinkRequest,
  filter,
  getLinksRequest,
  loadingCreateLink,
  loadingGetLinks,
  nextStepRequest,
  paymentLinkUrl,
  paymentLinks,
  previousStepRequest,
  resetStepsRequest,
  step,
  t,
  totalPaymentLinks,
}) => {
  const [linkFormData, setLinkFormData] = useState(makeDefaulLinkData())
  const [isNewLinkOpen, setIsNewLinkOpen] = useState(false)

  useEffect(() => {
    getLinksRequest(filter)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onPageCountChange = count => getLinksRequest({
    ...filter,
    count,
    page: 1,
  })

  const onPageNumberChange = page => getLinksRequest({
    ...filter,
    page,
  })

  const onOrderChange = ([sortField], sortOrder) => getLinksRequest({
    ...filter,
    sortField,
    sortOrder,
  })

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

  const onCreateLinkRequest = () => createLinkRequest(linkFormData)

  const onClosePaymentLink = () => {
    setLinkFormData(makeDefaulLinkData())
    resetStepsRequest()
    setIsNewLinkOpen(false)
  }

  const onCreateAnotherLink = () => {
    setLinkFormData(makeDefaulLinkData())
    resetStepsRequest()
  }

  const pagination = {
    offset: filter.count * filter.page,
    total: Math.ceil(totalPaymentLinks / filter.count),
  }

  return (
    <PaymentLinksContainer
      linkFormData={linkFormData}
      loadingCreateLink={loadingCreateLink}
      loadingGetLinks={loadingGetLinks}
      isNewLinkOpen={isNewLinkOpen}
      handleLinkFormChange={handleLinkFormChange}
      onAddPaymentLink={onAddPaymentLink}
      onClosePaymentLink={onClosePaymentLink}
      onCreateLinkRequest={onCreateLinkRequest}
      onCreateAnotherLink={onCreateAnotherLink}
      onOrderChange={onOrderChange}
      onPageCountChange={onPageCountChange}
      onPageNumberChange={onPageNumberChange}
      onNextStep={nextStepRequest}
      onPreviousStep={previousStepRequest}
      order={filter.sortOrder}
      orderField={filter.sortField}
      pageCount={filter.count}
      pagination={pagination}
      paymentLinks={paymentLinks}
      paymentLinkUrl={paymentLinkUrl}
      selectedPage={filter.page}
      step={steps[step]}
      t={t}
    />
  )
}

PaymentLinks.propTypes = {
  createLinkRequest: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    count: PropTypes.number,
    page: PropTypes.number,
    sortField: PropTypes.string,
    sortOrder: PropTypes.string,
  }).isRequired,
  getLinksRequest: PropTypes.func.isRequired,
  loadingCreateLink: PropTypes.bool.isRequired,
  loadingGetLinks: PropTypes.bool.isRequired,
  nextStepRequest: PropTypes.func.isRequired,
  paymentLinks: PropTypes.arrayOf(PropTypes.shape()),
  paymentLinkUrl: PropTypes.string,
  previousStepRequest: PropTypes.func.isRequired,
  resetStepsRequest: PropTypes.func.isRequired,
  step: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  totalPaymentLinks: PropTypes.number,
}

PaymentLinks.defaultProps = {
  paymentLinks: [],
  paymentLinkUrl: '',
  totalPaymentLinks: null,
}

export default enhanced(PaymentLinks)
