import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { withRouter } from 'react-router-dom'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import XLSX from 'xlsx'
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
  account: { client },
  paymentLinks: {
    loadingCreateLink,
    loadingGetLinks,
    paymentLinkUrl,
    paymentLinks,
    step,
    totalPaymentLinks,
  },
}) => ({
  client,
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

const handleCSVExportDownloadingClick = (data, filename) => {
  /* eslint-disable no-undef */
  const downloadLink = document.createElement('a')
  downloadLink.target = '_blank'
  downloadLink.download = filename.concat('csv')

  const blob = new Blob([data], { type: 'application/vnd.ms-excel' })

  const URL = window.URL || window.webkitURL
  const downloadUrl = URL.createObjectURL(blob)

  downloadLink.href = downloadUrl

  document.body.append(downloadLink)

  downloadLink.click()

  document.body.removeChild(downloadLink)
  URL.revokeObjectURL(downloadUrl)
  /* eslint-enable no-undef */
}

const handleXLSExportDownloadingClick = (data, filename) => {
  const workSheetName = 'sheetJS'
  const newWorkSheet = XLSX.utils.book_new()
  const dataWorkSheet = XLSX.utils.aoa_to_sheet(data)
  XLSX.utils.book_append_sheet(newWorkSheet, dataWorkSheet, workSheetName)

  XLSX.writeFile(newWorkSheet, filename.concat('xls'))
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

const initialPaginationData = {
  count: 15,
  page: 1,
  sortField: 'created_at',
  sortOrder: 'descending',
}

const PaymentLinks = ({
  client,
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
  const [exporting, setExporting] = useState(false)

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

  const handleExport = (exportType) => {
    setExporting(true)

    return client.paymentLinks
      .exportData(paginationData, exportType)
      .then((res) => {
        const filename = `paymentlinks-${moment().format('LLL')}`
        if (exportType === 'csv') {
          handleCSVExportDownloadingClick(res, filename)
        } else {
          handleXLSExportDownloadingClick(res, filename)
        }

        setExporting(false)
      })
  }

  return (
    <PaymentLinksContainer
      exporting={exporting}
      linkFormData={linkFormData}
      loadingCreateLink={loadingCreateLink}
      loadingGetLinks={loadingGetLinks}
      isNewLinkOpen={isNewLinkOpen}
      handleExport={handleExport}
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
  client: PropTypes.func.isRequired,
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
