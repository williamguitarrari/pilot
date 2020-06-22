import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { applySpec, compose, prop } from 'ramda'
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
import useFileExporter from '../../hooks/useFileExporter'

const mapStateToProps = ({
  paymentLinks: {
    loadingCreateLink,
    loadingGetLinks,
    paymentLinkUrl,
    paymentLinks,
    step,
    totalPaymentLinks,
  },
}) => ({
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

const exportHeaders = [
  'ID',
  'Status',
  'Nome',
  'Data',
  'Link',
  'Valor Pago',
]

const buildTotalPaid = ({
  amount,
  orders_paid: ordersPaid,
}) => ((ordersPaid * amount) / 100).toFixed(2)

const exportParser = applySpec({
  id: prop('id'),
  name: prop('name'),
  status: prop('status'),
  totalPaid: buildTotalPaid,
  url: prop('url'),
})

const exportPrefix = 'payment_links'

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

const initialPaginationData = {
  count: 15,
  page: 1,
  sortField: 'created_at',
  sortOrder: 'descending',
}

const PaymentLinks = ({
  createLinkRequest,
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
  const [paginationData, setPaginationData] = useState(initialPaginationData)
  const handleExport = useFileExporter({
    exportHeaders,
    exportParser,
    exportPrefix,
  })

  useEffect(() => getLinksRequest(initialPaginationData), [getLinksRequest])

  const onPageCountChange = (count) => {
    const newPaginationData = {
      ...paginationData,
      count,
      page: 1,
    }
    setPaginationData(newPaginationData)
    return getLinksRequest(newPaginationData)
  }

  const onPageNumberChange = (page) => {
    const newPaginationData = {
      ...paginationData,
      page,
    }
    setPaginationData(newPaginationData)
    return getLinksRequest(newPaginationData)
  }

  const onOrderChange = ([sortField], sortOrder) => {
    const newPaginationData = {
      ...paginationData,
      sortField,
      sortOrder,
    }
    setPaginationData(newPaginationData)
    return getLinksRequest(newPaginationData)
  }

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
    offset: paginationData.count * paginationData.page,
    total: Math.ceil(totalPaymentLinks / paginationData.count),
  }

  const onExport = exportType => handleExport(
    paymentLinks,
    exportType
  )

  return (
    <PaymentLinksContainer
      linkFormData={linkFormData}
      loadingCreateLink={loadingCreateLink}
      loadingGetLinks={loadingGetLinks}
      isNewLinkOpen={isNewLinkOpen}
      onExport={onExport}
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
      order={paginationData.sortOrder}
      orderField={paginationData.sortField}
      pageCount={paginationData.count}
      pagination={pagination}
      paymentLinks={paymentLinks}
      paymentLinkUrl={paymentLinkUrl}
      selectedPage={paginationData.page}
      step={steps[step]}
      t={t}
    />
  )
}

PaymentLinks.propTypes = {
  createLinkRequest: PropTypes.func.isRequired,
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
  totalPaymentLinks: PropTypes.number.isRequired,
}

PaymentLinks.defaultProps = {
  paymentLinks: [],
  paymentLinkUrl: '',
}

export default enhanced(PaymentLinks)
