import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import {
  Alert,
  Snackbar,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import {
  assocPath,
  compose,
  lensPath,
  mergeLeft,
  pipe,
  propEq,
  reject,
  view,
} from 'ramda'

import { getErrorMessage } from '../../../formatters/error'
import itemsPerPage from '../../../models/itemsPerPage'

import ConfirmModal from '../../../components/ConfirmModal'
import DetailRecipient from '../../../containers/RecipientDetails'
import Loader from '../../../components/Loader'
import style from './style.css'

const mapStateToProps = (state = {}) => {
  const { account } = state
  const {
    client,
    company: {
      anticipation_config: {
        config_anticipation_params: canConfigureAnticipation,
      },
    } = {
      anticipation_config: {
        config_anticipation_params: false,
      },
    },
  } = account || {}

  return { canConfigureAnticipation, client }
}

const enhanced = compose(
  connect(mapStateToProps),
  translate(),
  withRouter
)

const handleExportDataSuccess = (res, format) => {
  let contentType
  if (format === 'xlsx') {
    contentType = 'application/ms-excel'
  } else {
    contentType = 'text/csv;charset=utf-8'
  }

  const blob = new Blob([res], { type: contentType })
  const filename = `PagarMe_Extrato_${moment().format('L')}.${format}`

  const downloadLink = document.createElement('a')
  downloadLink.target = '_blank'
  downloadLink.download = filename
  const URL = window.URL || window.webkitURL
  const downloadUrl = URL.createObjectURL(blob)
  downloadLink.href = downloadUrl
  document.body.append(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
  URL.revokeObjectURL(downloadUrl)
}

class DetailRecipientPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
      // It was commented on to remove the anticipation limits call on Balance page
      // This code will be used again in the future when ATLAS project implements the anticipation flow
      // More details in issue #1159
      // anticipationError: false,
      // anticipationLimitAmount: 0,
      anticipationToCancel: null,
      balance: {},
      balanceLoading: false,
      currentPage: 1,
      dates: {
        end: moment(),
        start: moment().subtract(7, 'day'),
      },
      disabled: false,
      errorMessage: '',
      exporting: false,
      loading: true,
      nextPage: null,
      pageError: false,
      recipientData: {},
      selectedItemsPerPage: 15,
      showModal: false,
      showSnackbar: false,
      timeframe: 'past',
      total: {},
    }

    this.fetchAnticipationLimit = this.fetchAnticipationLimit.bind(this)
    this.fetchBalance = this.fetchBalance.bind(this)
    this.fetchBalanceAndOperations = this.fetchBalanceAndOperations.bind(this)
    this.fetchBalanceTotal = this.fetchBalanceTotal.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.fetchOperations = this.fetchOperations.bind(this)
    this.fetchNextOperations = this.fetchNextOperations.bind(this)
    this.fetchRecipientData = this.fetchRecipientData.bind(this)
    this.handleAnticipationCancel = this.handleAnticipationCancel.bind(this)
    this.handleDateFilter = this.handleDateFilter.bind(this)
    this.handleErrorMessage = this.handleErrorMessage.bind(this)
    this.handleExportData = this.handleExportData.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePageCountChange = this.handlePageCountChange.bind(this)
    this.onSaveAnticipation = this.onSaveAnticipation.bind(this)
    this.onSaveBankAccount = this.onSaveBankAccount.bind(this)
    this.onSaveBankAccountWithBank = this.onSaveBankAccountWithBank
      .bind(this)
    this.onSaveBankAccountWithId = this.onSaveBankAccountWithId
      .bind(this)
    this.onSaveTransfer = this.onSaveTransfer.bind(this)
    this.hideCancelAnticipationModal = this.hideCancelAnticipationModal
      .bind(this)
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
    this.sendToAnticipationPage = this.sendToAnticipationPage.bind(this)
    this.sendToWithdrawPage = this.sendToWithdrawPage.bind(this)
    this.showCancelAnticipationModal = this.showCancelAnticipationModal
      .bind(this)
  }

  componentDidMount () {
    this.fetchData()
  }

  onSaveAnticipation (anticipationData) {
    const {
      canConfigureAnticipation,
      client,
      match,
    } = this.props
    const { id } = match.params
    return client.recipient.update(
      id,
      { configuration: anticipationData },
      { canConfigureAnticipation }
    )
      .then(() => {
        const anticipationPath = [
          'recipientData',
          'configurationData',
          'anticipation',
        ]
        const updateAnticipation = assocPath(anticipationPath, anticipationData)
        const newState = updateAnticipation(this.state)
        this.setState({
          ...newState,
          showSnackbar: true,
        })
      })
      .catch((error) => {
        this.handleErrorMessage(error)
      })
  }

  onSaveTransfer (transferData) {
    const {
      canConfigureAnticipation,
      client,
      match,
    } = this.props
    const { id } = match.params
    const updatedData = {
      configuration: {
        ...transferData,
        anticipationModel: null,
      },
    }

    return client.recipient.update(
      id,
      updatedData,
      { canConfigureAnticipation }
    )
      .then(() => {
        const transferPath = ['recipientData', 'configurationData', 'transfer']
        const updateTransfer = assocPath(transferPath, transferData)
        const newState = updateTransfer(this.state)
        this.setState({
          ...newState,
          showSnackbar: true,
        })
      })
      .catch((error) => {
        this.handleErrorMessage(error)
      })
  }

  onSaveBankAccountWithId (data) {
    const {
      canConfigureAnticipation,
      client,
      match,
    } = this.props
    const { id } = match.params

    return client.recipient.update(
      id,
      { configuration: data },
      { canConfigureAnticipation }
    )
  }

  onSaveBankAccountWithBank (data) {
    const {
      canConfigureAnticipation,
      client,
      match,
    } = this.props
    const { recipientData } = this.state
    const { id } = match.params

    const { identification } = recipientData.informationData
    const { documentType } = identification

    return client.recipient.createNewAccount({
      bankAccount: data,
      identification: {
        documentType,
        [documentType]: recipientData
          .informationData.identification[documentType],
      },
    })
      .then((bankAccountCreated) => {
        const { accounts } = recipientData.configurationData
        const accountsPath = ['configurationData', 'accounts']
        const newAccounts = [...accounts, bankAccountCreated]
        const newState = assocPath(accountsPath, newAccounts, recipientData)

        this.setState({
          recipientData: newState,
        })

        return client.recipient.update(
          id,
          {
            configuration: {
              id: bankAccountCreated.id,
            },
          },
          {
            canConfigureAnticipation,
          }
        )
      })
  }

  onSaveBankAccount (data) {
    let operation = Promise.resolve()

    if (data.id) {
      operation = this.onSaveBankAccountWithId(data)
    } else if (data.bank) {
      operation = this.onSaveBankAccountWithBank(data)
    }

    return operation
      .then((dataUpdated) => {
        const buildNewState = pipe(
          assocPath(
            ['recipientData', 'configurationData', 'bankAccount'],
            dataUpdated.bank_account
          ),
          assocPath(
            ['recipientData', 'companyData', 'name'],
            dataUpdated.bank_account.name
          )
        )

        const newState = buildNewState(this.state)

        this.setState({
          ...newState,
          showSnackbar: true,
        })
      })
      .catch((error) => {
        this.handleErrorMessage(error)
      })
  }

  handleErrorMessage (error) {
    const getError = getErrorMessage(error)
    this.setState({
      errorMessage: getError,
      showSnackbar: true,
    })
  }

  handleCloseSnackbar () {
    this.setState({ showSnackbar: false })
  }

  handleDateFilter (dates) {
    const firstPage = 1
    const balanceOperations = this.fetchBalanceAndOperations(dates, firstPage)
    const balanceTotalPromise = this.fetchBalanceTotal(dates)

    return Promise.all([balanceOperations, balanceTotalPromise])
      .then(([balance, total]) => this.setState({
        balance,
        currentPage: firstPage,
        dates,
        total,
      }))
  }

  handleExportData (format) {
    this.setState({ exporting: true })
    const { client, match } = this.props
    const { dates } = this.state
    const startDate = dates.start.startOf('day').format('x')
    const endDate = dates.end.endOf('day').format('x')

    const { id: recipientId } = match.params
    return client
      .withVersion('2019-09-01')
      .balanceOperations
      .find({
        endDate,
        format,
        recipientId,
        startDate,
      })
      .then((res) => {
        this.setState({ exporting: false })
        handleExportDataSuccess(res, format)
      })
      .catch((pageError) => {
        this.setState({
          pageError,
        })
      })
  }

  handlePageChange (page) {
    const {
      balance,
      dates,
    } = this.state

    this.fetchOperations(dates, page)
      .then((operations) => {
        this.setState({
          balance: mergeLeft({
            search: operations.search,
          }, balance),
          currentPage: page,
          dates,
        })
      })
  }

  handlePageCountChange (pageCount) {
    const {
      balance,
      dates,
    } = this.state
    const firstPage = 1

    this.fetchOperations(dates, firstPage, pageCount)
      .then(operations => this.setState({
        balance: mergeLeft({
          search: operations.search,
        }, balance),
        currentPage: firstPage,
        selectedItemsPerPage: pageCount,
      }))
  }

  handleAnticipationCancel () {
    const { client, match } = this.props
    const { anticipationToCancel } = this.state
    const requestBody = {
      id: anticipationToCancel,
      recipientId: match.params.id,
    }

    return client.bulkAnticipations.cancel(requestBody)
      .then((response) => {
        const requestPath = ['balance', 'requests']
        const getRequests = view(lensPath(requestPath))
        const removeCanceled = reject(propEq('id', response.id))

        const oldRequests = getRequests(this.state)
        const newRequests = removeCanceled(oldRequests)

        const updateRequests = assocPath(requestPath, newRequests)
        const newState = updateRequests(this.state)

        this.setState({
          ...newState,
          anticipationToCancel: null,
          showModal: false,
        })
      })
      .catch((pageError) => {
        this.setState({
          ...this.state, // eslint-disable-line
          anticipationToCancel: null,
          pageError,
          showModal: false,
        })
      })
  }

  showCancelAnticipationModal (anticipationId) {
    return this.setState({
      anticipationToCancel: anticipationId,
      showModal: true,
    })
  }

  hideCancelAnticipationModal () {
    return this.setState({
      anticipationToCancel: null,
      showModal: false,
    })
  }

  fetchData () {
    const {
      currentPage,
      dates,
    } = this.state

    const recipientDataPromise = this.fetchRecipientData()
    // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
    // It was commented on to remove the anticipation limits call on Balance page
    // This code will be used again in the future when ATLAS project implements the anticipation flow
    // More details in issue #1159
    // const anticipationLimitPromise = this.fetchAnticipationLimit()
    const balancePromise = this.fetchBalanceAndOperations(dates, currentPage)
    const balanceTotalPromise = this.fetchBalanceTotal(dates)

    return Promise.all([
      recipientDataPromise,
      // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
      // It was commented on to remove the anticipation limits call on Balance page
      // This code will be used again in the future when ATLAS project implements the anticipation flow
      // More details in issue #1159
      // anticipationLimitPromise,
      balancePromise,
      balanceTotalPromise,
    ])
      .then(([
        recipientData,
        // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
        // It was commented on to remove the anticipation limits call on Balance page
        // This code will be used again in the future when ATLAS project implements the anticipation flow
        // More details in issue #1159
        // anticipationLimit,
        balance,
        total,
      ]) => {
        // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
        // It was commented on to remove the anticipation limits call on Balance page
        // This code will be used again in the future when ATLAS project implements the anticipation flow
        // More details in issue #1159
        // const { amount, error } = anticipationLimit
        const {
          search: {
            operations,
            query,
          },
        } = balance

        const hasNextPage = operations.rows.length >= query.count

        this.setState({
          // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
          // It was commented on to remove the anticipation limits call on Balance page
          // This code will be used again in the future when ATLAS project implements the anticipation flow
          // More details in issue #1159
          // anticipationError: error,
          // anticipationLimitAmount: amount,
          balance,
          hasNextPage,
          loading: false,
          recipientData,
          total,
        })
      })
      .catch((pageError) => {
        this.setState({
          loading: false,
          pageError,
        })
      })
  }

  fetchRecipientData () {
    const { client, match } = this.props
    const { id } = match.params

    return client.recipient.detail(id)
      .then((recipient) => {
        const { identification } = recipient.informationData
        const accountsPromise = client.recipient.bankAccount(identification)
        return Promise.all([recipient, accountsPromise])
      })
      .then(([recipient, bankAccounts]) => {
        const { accounts } = bankAccounts
        const accountsPath = ['configurationData', 'accounts']
        const addAccounts = assocPath(accountsPath, accounts)
        const recipientData = addAccounts(recipient)
        return recipientData
      })
  }

  fetchAnticipationLimit () {
    const { client, match } = this.props
    const { id } = match.params
    return client.recipient.anticipationLimits(id)
      .then(limits => ({ amount: limits.maximum.amount, error: false }))
      .catch(error => ({ amount: 0, error }))
  }

  fetchBalanceAndOperations (dates, page) {
    const balancePromise = this.fetchBalance(dates, page)
    const operationsPromise = this.fetchOperations(dates, page)

    return Promise.all([operationsPromise, balancePromise])
      .then(([operations, balance]) => ({
        ...balance.result,
        search: {
          ...operations.search,
        },
      }))
  }

  fetchBalance (dates, page) {
    const {
      selectedItemsPerPage,
      timeframe,
    } = this.state
    const { client, match } = this.props
    const { id } = match.params
    const query = {
      count: selectedItemsPerPage,
      dates,
      page,
      timeframe,
    }

    const getRecipientData = client.balance.data(id, query)

    return getRecipientData
  }

  fetchOperations (dates, page, count) {
    const {
      nextPage,
      selectedItemsPerPage,
      timeframe,
    } = this.state
    const { client, match } = this.props
    const { id: recipientId } = match.params
    const query = {
      count: count || selectedItemsPerPage,
      dates,
      page,
      recipientId,
      timeframe,
    }

    this.setState({
      disabled: true,
    })

    const getOperations = nextPage && nextPage.query.page === page
      ? Promise.resolve(nextPage)
      : client.balance.operations(query)

    return getOperations
      .then((operations) => {
        this.fetchNextOperations(operations, query)

        return {
          search: {
            ...operations.result.search,
            query: operations.query,
          },
        }
      })
  }

  fetchNextOperations (operations, query) {
    const {
      client,
    } = this.props

    const {
      query: {
        count: operationsCount,
      },
      result: {
        search,
      },
    } = operations

    const hasNextPage = search.operations.rows.length >= operationsCount

    if (hasNextPage) {
      this.setState({
        disabled: true,
      })

      client.balance.operations(mergeLeft({
        page: query.page + 1,
      }, query))
        .then((nextPageBalance) => {
          const {
            result: {
              search: {
                operations: {
                  rows,
                },
              },
            },
          } = nextPageBalance

          this.setState({
            disabled: false,
            nextPage: rows.length > 0
              ? nextPageBalance
              : null,
          })
        })
    } else {
      this.setState({
        disabled: false,
        nextPage: null,
      })
    }
  }

  fetchBalanceTotal (dates) {
    const { client, match } = this.props
    const { id } = match.params
    const query = { dates }
    return client.balance.total(id, query)
  }

  sendToAnticipationPage () {
    const { history, match } = this.props
    const { id } = match.params
    history.push(`/anticipation/${id}`)
  }

  sendToWithdrawPage () {
    const { history, match } = this.props
    const { id } = match.params
    history.push(`/withdraw/${id}`)
  }

  render () {
    const {
      // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
      // It was commented on to remove the anticipation limits call on Balance page
      // This code will be used again in the future when ATLAS project implements the anticipation flow
      // More details in issue #1159
      // anticipationError,
      // anticipationLimitAmount,
      balance,
      balanceLoading,
      currentPage,
      dates,
      disabled,
      errorMessage,
      exporting,
      loading,
      nextPage,
      pageError,
      recipientData,
      selectedItemsPerPage,
      showModal,
      showSnackbar,
      timeframe,
      total,
    } = this.state

    const {
      canConfigureAnticipation,
      t,
    } = this.props

    const itemsPerPageOptions = itemsPerPage.map(count => ({
      name: t('items_per_page', { count }),
      value: `${count}`,
    }))

    if (loading) {
      return <Loader visible />
    }

    if (pageError) {
      const unknownErrorMessage = t('unknown_error')
      const pageErrorMessage = getErrorMessage(pageError) || unknownErrorMessage

      return (
        <Alert icon={<IconInfo height={16} width={16} />} type="info">
          <span>{pageErrorMessage}</span>
        </Alert>
      )
    }

    const {
      companyData,
      configurationData,
      informationData,
    } = recipientData

    const { transferEnabled } = configurationData.transfer

    const anticipation = {
      automaticTransfer: transferEnabled,
      // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
      // It was commented on to remove the anticipation limits call on Balance page
      // This code will be used again in the future when ATLAS project implements the anticipation flow
      // More details in issue #1159
      // available: anticipationLimitAmount,
      // error: anticipationError,
      loading,
    }

    return (
      <div className={style.relative}>
        {showSnackbar
          && (
          <Snackbar
            icon={<IconClose height={12} width={12} />}
            dismissTimeout={2500}
            onDismiss={this.handleCloseSnackbar}
            type={errorMessage ? 'error' : 'info'}
          >
            <p>
              {errorMessage || t('pages.recipient_detail.configuration_changed')}
            </p>
          </Snackbar>
          )
        }
        <DetailRecipient
          informationProps={informationData}
          balanceProps={{
            ...balance,
            anticipation,
            currentPage,
            dates,
            disabled: {
              operations: disabled || loading,
              summary: loading,
            },
            exporting,
            hasNextPage: nextPage !== null,
            itemsPerPage: selectedItemsPerPage,
            loading,
            onAnticipationClick: this.sendToAnticipationPage,
            onCancelRequestClick: this.showCancelAnticipationModal,
            onExport: this.handleExportData,
            onFilterClick: this.handleDateFilter,
            onPageChange: this.handlePageChange,
            onPageCountChange: this.handlePageCountChange,
            onWithdrawClick: this.sendToWithdrawPage,
            pageSizeOptions: itemsPerPageOptions,
            tableLoading: balanceLoading,
            timeframe,
            total,
          }}
          configurationProps={{
            ...configurationData,
            onSaveAnticipation: this.onSaveAnticipation,
            onSaveBankAccount: this.onSaveBankAccount,
            onSaveTransfer: this.onSaveTransfer,
          }}
          exporting={exporting}
          recipient={companyData}
          t={t}
          capabilities={{
            canConfigureAnticipation,
          }}
        />
        <ConfirmModal
          cancelText={t('cancel_pending_anticipations_cancel')}
          confirmText={t('cancel_pending_anticipations_confirm')}
          isOpen={showModal}
          onCancel={this.hideCancelAnticipationModal}
          onConfirm={this.handleAnticipationCancel}
          size="default"
          title={t('cancel_pending_anticipations_title')}
        >
          <div>
            {t('cancel_pending_anticipations_text')}
          </div>
        </ConfirmModal>
      </div>
    )
  }
}

DetailRecipientPage.propTypes = {
  canConfigureAnticipation: PropTypes.bool.isRequired,
  client: PropTypes.shape({
    bulkAnticipations: PropTypes.shape({
      cancel: PropTypes.func.isRequired,
    }).isRequired,
    recipient: PropTypes.shape({
      add: PropTypes.func.isRequired,
      bankAccount: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(DetailRecipientPage)
