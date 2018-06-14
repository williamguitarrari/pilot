/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
  always,
  complement,
  compose,
  either,
  head,
  ifElse,
  is,
  isEmpty,
  isNil,
  length,
  pipe,
  prop,
} from 'ramda'
import moment from 'moment'
import {
  requestDetails,
  receiveDetails,
} from './actions'
import { requestLogout } from '../../Account/actions'
import Reprocess from '../../Reprocess'
import currencyFormatter from '../../../formatters/decimalCurrency'
import getColumnFormatter from '../../../formatters/columnTranslator'
import installmentTableColumns from '../../../components/RecipientSection/installmentTableColumns'
import ManualReview from '../../ManualReview'
import TransactionDetailsContainer from '../../../containers/TransactionDetails'
import Refund from '../../Refund'

const mapStateToProps = ({
  account: {
    client,
    user: {
      permission,
    },
  },
  transactions: { loading, query },
}) => ({
  client,
  loading,
  permission,
  query,
})

const mapDispatchToProps = ({
  onReceiveDetails: receiveDetails,
  onRequestDetailsFail: requestLogout,
  onRequestDetails: requestDetails,
})

const enhanced = compose(
  translate('transactions'),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

const copyToClipBoard = (text) => {
  const textarea = document.createElement('textarea')
  textarea.textContent = text

  textarea.style.opacity = 0
  textarea.style.position = 'absolute'

  document.body.appendChild(textarea)
  textarea.select()

  document.execCommand('copy')
  document.body.removeChild(textarea)
}

const getTransactionDetailsLabels = t => ({
  acquirer_name: t('transaction.acquirer_name'),
  acquirer_response_code: t('transaction.acquirer_response_code'),
  antifraud_score: t('transaction.antifraud_score'),
  authorization_code: t('transaction.authorization_code'),
  capture_method: t('transaction.capture_method'),
  nsu: t('transaction.nsu'),
  soft_descriptor: t('transaction.soft_descriptor'),
  subscription_id: t('transaction.subscription_id'),
  tid: t('transaction.tid'),
  title: t('transaction.title'),
})

const countCustomerPhones = pipe(
  prop('phones'),
  ifElse(
    either(isNil, complement(is(Array))),
    always(0),
    length
  )
)


const getCustomerLabels = (customer, t) => ({
  birthday: t('customer.birthday'),
  city: t('customer.city'),
  complementary: t('customer.complement'),
  document_number: t('customer.document_number'),
  email: t('customer.email'),
  gender: t('customer.gender'),
  name: t('customer.name'),
  neighborhood: t('customer.neighborhood'),
  phones: t('customer.phone', { count: countCustomerPhones(customer) }),
  state: t('customer.state'),
  street_number: t('customer.number'),
  street: t('customer.street'),
  title: t('customer.title'),
  zipcode: t('customer.zip_code'),
})

const getEventsLabels = t => ({
  title: t('events.title'),
})

const getPaymentBoletoLabels = t => ({
  copy: t('copy'),
  due_date: t('boleto.due_date'),
  feedback: t('boleto.feedback'),
  show: t('boleto.show'),
  title: t('boleto.title'),
})

const getPaymentCardLabels = t => ({
  title: t('credit_card'),
})

const getRiskLevelsLabels = t => ({
  very_low: t('transaction.risk_level.very_low'),
  low: t('transaction.risk_level.low'),
  moderated: t('transaction.risk_level.moderated'),
  high: t('transaction.risk_level.high'),
  very_high: t('transaction.risk_level.very_high'),
})

// TODO: Remove this function and it usage when the this issue is solved
// https://github.com/pagarme/pilot/issues/681
const getDefaultPhone = ifElse(
  either(isNil, isEmpty),
  always(null),
  head
)

// TODO: Remove this function and it usage when the this issue is solved
// https://github.com/pagarme/pilot/issues/681
const removeCustomerUnusedPhones = (transaction) => {
  if (!transaction.customer) {
    return transaction
  }
  const { phones, ...customer } = transaction.customer

  return {
    ...transaction,
    customer: {
      ...customer,
      phones: getDefaultPhone(phones),
    },
  }
}

class TransactionDetails extends Component {
  constructor (props) {
    super(props)
    const { t } = this.props
    const formatColumns = getColumnFormatter(t)
    this.state = {
      eventsLabels: getEventsLabels(t),
      installmentColumns: formatColumns(installmentTableColumns),
      manualReviewAction: null,
      nextId: null,
      paymentBoletoLabels: getPaymentBoletoLabels(t),
      paymentCardLabels: getPaymentCardLabels(t),
      result: {
        transaction: {},
      },
      riskLevelsLabels: getRiskLevelsLabels(t),
      showManualReview: false,
      showRefund: false,
      showReprocess: false,
      transactionDetailsLabels: getTransactionDetailsLabels(t),
    }

    this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
    this.handleCloseManualReview = this.handleCloseManualReview.bind(this)
    this.handleCloseRefund = this.handleCloseRefund.bind(this)
    this.handleCopyBoletoUrlClick = this.handleCopyBoletoUrlClick.bind(this)
    this.handleCopyBoletoUrlClick = this.handleCopyBoletoUrlClick.bind(this)
    this.handleManualReviewApprove = this.handleManualReviewApprove.bind(this)
    this.handleManualReviewRefuse = this.handleManualReviewRefuse.bind(this)
    this.handleNextTransactionRedirect = this.handleNextTransactionRedirect.bind(this)
    this.handlePreviousTransactionRedirect = this.handlePreviousTransactionRedirect.bind(this)
    this.handleRefund = this.handleRefund.bind(this)
    this.handleReprocessClose = this.handleReprocessClose.bind(this)
    this.handleReprocessOpen = this.handleReprocessOpen.bind(this)
    this.handleShowBoletoClick = this.handleShowBoletoClick.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.requestData = this.requestData.bind(this)
  }

  componentDidMount () {
    const { match: { params: { id } } } = this.props
    this.handleUpdate(id, true)
  }

  componentWillReceiveProps ({ match: { params: { id } } }) {
    this.handleUpdate(id)
  }

  handleUpdate (id, forceUpdate) {
    const { match: { params }, history } = this.props
    if (isNil(id)) {
      history.replace('/transactions')
    } else if (id !== params.id || forceUpdate) {
      this.requestData(id)
    }
  }

  requestData (query) {
    this.props.onRequestDetails({ query })

    return this.props.client
      .transactions
      .details(query)
      .then((result) => {
        this.setState({ result })
        this.props.onReceiveDetails(result)
      })
      .catch((error) => {
        this.props.onRequestDetailsFail(error)
      })
  }

  handleAlertDismiss () {
    const { history } = this.props
    history.push('/')
  }

  handleCopyBoletoUrlClick () {
    const {
      transaction: {
        boleto,
      },
    } = this.state.result
    copyToClipBoard(boleto.barcode)
  }

  handleManualReviewApprove () {
    this.setState({
      showManualReview: true,
      manualReviewAction: 'approve',
    })
  }

  handleManualReviewRefuse () {
    this.setState({
      showManualReview: true,
      manualReviewAction: 'refuse',
    })
  }

  handleCloseManualReview () {
    this.setState({ showManualReview: false })
  }

  handleRefund () {
    this.setState({ showRefund: true })
  }

  handleCloseRefund () {
    this.setState({ showRefund: false })
  }

  handleNextTransactionRedirect () {
    const {
      result: {
        transaction,
      },
      nextId,
    } = this.state
    const nextTransactionId = transaction.nextId || nextId
    const { history } = this.props
    history.push(`/transactions/${nextTransactionId}`)
  }

  handlePreviousTransactionRedirect () {
    const {
      result: {
        transaction: {
          previousId,
        },
      },
    } = this.state
    const { history } = this.props

    history.push(`/transactions/${previousId}`)
  }

  handleReprocessClose (nextId) {
    this.setState({
      nextId,
      showReprocess: false,
    })
  }

  handleReprocessOpen () {
    this.setState({
      showReprocess: true,
    })
  }

  handleShowBoletoClick () {
    const {
      transaction: {
        boleto,
      },
    } = this.state.result
    window.open(boleto.url)
  }

  render () {
    const {
      match: { params: { id } },
      permission,
      t,
    } = this.props
    const {
      eventsLabels,
      installmentColumns,
      nextId,
      paymentBoletoLabels,
      paymentCardLabels,
      riskLevelsLabels,
      showReprocess,
      result,
      transactionDetailsLabels,
      showManualReview,
      manualReviewAction,
      showRefund,
    } = this.state

    const transaction = removeCustomerUnusedPhones(result.transaction)

    const {
      captured_at,
      customer,
      payment = { installments: [] },
      reason_code,
      recipients = [],
    } = transaction

    const alertLabels = {
      chargeback_reason_label: t('alert.chargeback_reason'),
      chargeback_reason: t(`chargeback.code.${reason_code || 'unknown'}`),
      reason_code: t('alert.reason_code', { code: reason_code || '-' }),
      resubmit: t('alert.resubmit'),
    }

    const customerLabels = getCustomerLabels(customer, t)

    const headerLabels = {
      boletoAmountLabel: t('header.boleto_amount'),
      cardAmountLabel: t('header.card_amount'),
      installmentsLabel: t('header.installment_title'),
      installments: t('header.installment', {
        count: payment.installments,
      }),
      title: t('header.title'),
      statusLabel: t('header.status'),
      approveLabel: t('header.approve'),
      refuseLabel: t('header.refuse'),
    }

    const recipientsLabels = {
      collapseInstallmentTitle: t('recipients.collapsedInstallments'),
      expandInstallmentTitle: t('recipients.expandedInstallments'),
      installmentTotalLabel: t('recipients.amount'),
      liabilitiesLabel: t('recipients.liabilities'),
      netAmountLabel: t('recipients.net_amount'),
      noRecipientLabel: t('recipients.empty'),
      outAmountLabel: t('recipients.out_amount', { symbol: t('currency_symbol') }),
      statusLabel: t('recipients.status'),
      title: t('recipients.title', {
        count: recipients.length,
      }),
      totalRecipientsLabel: t('recipients.total_recipient', {
        count: recipients.length,
      }),
      totalTitle: t('recipients.total_amount'),
    }

    const reprocessLabels = {
      previousAlert: t('reprocess.previous'),
      nextAlert: t('reprocess.next'),
      showPrevious: t('reprocess.showPrevious'),
      showNext: t('reprocess.showNext'),
    }

    const totalDisplayLabels = {
      captured_at: captured_at
        ? t('captured_at', { date: moment(captured_at).format('L') })
        : t('not_captured'),
      currency_symbol: t('currency_symbol'),
      mdr: t('payment.mdr',
        { value: currencyFormatter(payment.mdr_amount || 0) }
      ),
      cost: t('payment.cost',
        { value: currencyFormatter(payment.cost_amount || 0) }
      ),
      net_amount: t('net_amount'),
      out_amount: t('out_amount'),
      paid_amount: t('paid_amount'),
      // receive_date: t('received_at', { date: '01/01/1970' }),
      refund: t('payment.refund',
        { value: currencyFormatter(payment.refund_amount || 0) }
      ),
    }

    const nextTransactionId = transaction.nextId || nextId

    return (
      <Fragment>
        <TransactionDetailsContainer
          alertLabels={alertLabels}
          atLabel={t('at')}
          boletoWarningMessage={t('boleto.waiting_payment_warning')}
          customerLabels={customerLabels}
          eventsLabels={eventsLabels}
          headerLabels={headerLabels}
          installmentColumns={installmentColumns}
          metadataTitle={t('metadata')}
          nextTransactionId={nextTransactionId}
          onCopyBoletoUrl={this.handleCopyBoletoUrlClick}
          onDismissAlert={this.handleAlertDismiss}
          onManualReviewApprove={this.handleManualReviewApprove}
          onManualReviewRefuse={this.handleManualReviewRefuse}
          onRefund={this.handleRefund}
          onNextTransactionRedirect={this.handleNextTransactionRedirect}
          onPreviousTransactionRedirect={this.handlePreviousTransactionRedirect}
          onReprocess={this.handleReprocessOpen}
          onShowBoleto={this.handleShowBoletoClick}
          paymentBoletoLabels={paymentBoletoLabels}
          paymentCardLabels={paymentCardLabels}
          permissions={{
            manualReview: permission !== 'read_only',
            refund: permission !== 'read_only',
            reprocess: permission !== 'read_only',
          }}
          recipientsLabels={recipientsLabels}
          riskLevelsLabels={riskLevelsLabels}
          reprocessLabels={reprocessLabels}
          totalDisplayLabels={totalDisplayLabels}
          transaction={transaction}
          transactionDetailsLabels={transactionDetailsLabels}
        />
        {showManualReview &&
          <ManualReview
            action={manualReviewAction}
            isOpen={showManualReview}
            onClose={this.handleCloseManualReview}
            onFinish={() => { this.handleUpdate(transaction.id) }}
            t={t}
            transactionId={transaction.id}
          />
        }
        {showRefund &&
          <Refund
            isOpen={showRefund}
            onClose={this.handleCloseRefund}
            onSuccess={this.handleUpdate}
            transaction={transaction}
          />}
        {showReprocess &&
          <Reprocess
            onClose={this.handleReprocessClose}
            transactionId={id}
            transaction={transaction}
          />
        }
      </Fragment>
    )
  }
}

TransactionDetails.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
  onReceiveDetails: PropTypes.func.isRequired,
  onRequestDetails: PropTypes.func.isRequired,
  onRequestDetailsFail: PropTypes.func.isRequired,
  permission: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(TransactionDetails)
