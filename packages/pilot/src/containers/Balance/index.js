import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  always,
  anyPass,
  isEmpty,
  isNil,
  keys,
  map,
  prop,
  uncurryN,
  when,
} from 'ramda'
import {
  Card,
  CardContent,
  Col,
  DateInput,
  Grid,
  Row,
} from 'former-kit'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'

import BalanceSummary from '../../components/BalanceSummary'
import BalanceTotalDisplay from '../../components/BalanceTotalDisplay'
import bulkAnticipationsLabels from '../../models/bulkAnticipationTypes'
import currencyFormatter from '../../formatters/currency'
import dateFormatter from '../../formatters/longDate'
import dateLimits from '../../models/dateSelectorLimits'
import datePresets from '../../models/dateSelectorPresets'
import DetailsHead from '../../components/DetailsHead'
import getColumns from '../../components/Operations/operationsTableColumns'
import getColumnsTranslator from '../../formatters/columnTranslator'
import Operations from '../../components/Operations'
import operationsTypesLabels from '../../models/operationTypes'
import PendingRequests from '../../components/PendingRequests'

const isZero = value => value === 0

const normalizePage = uncurryN(2, defaultValue =>
  when(
    anyPass([isNil, isEmpty, isZero]),
    always(defaultValue)
  )
)

class Balance extends Component {
  constructor (props) {
    super(props)

    this.getHeadProp = this.getHeadProp.bind(this)
    this.getHeadProperties = this.getHeadProperties.bind(this)
    this.getPendingRequest = this.getPendingRequest.bind(this)
    this.getPendingRequests = this.getPendingRequests.bind(this)
    this.getSummaryTotal = this.getSummaryTotal.bind(this)
    this.getTypeLabels = this.getTypeLabels.bind(this)
    this.handleAnticipationClick = this.handleAnticipationClick.bind(this)
    this.handleChangeRecipientClick = this.handleChangeRecipientClick.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleOperationsPageChange = this.handleOperationsPageChange.bind(this)
    this.handleRequestCancelClick = this.handleRequestCancelClick.bind(this)
    this.handleWithdrawalClick = this.handleWithdrawalClick.bind(this)

    const typesLabels = map(this.getTypeLabels, operationsTypesLabels)
    const translateColumns = getColumnsTranslator(this.props.t)
    this.state = {
      operationsColumns: translateColumns(getColumns(typesLabels)),
    }
  }

  getHeadProp (key) {
    const {
      recipient: {
        bank_account, // eslint-disable-line camelcase
      },
      t,
    } = this.props
    return ({
      children: <span>{t(`${key}`, prop(key, bank_account))}</span>,
      title: t(`balance.${key}`),
    })
  }

  getHeadProperties () {
    const {
      recipient: {
        bank_account: {
          account,
          agency,
          bank_code, // eslint-disable-line camelcase
          type,
        }, // eslint-disable-line camelcase
      },
    } = this.props

    return map(this.getHeadProp, keys({
      bank_code,
      type,
      agency,
      account,
    }))
  }

  getPendingRequest ({
    amount,
    created_at, // eslint-disable-line camelcase
    type,
  }) {
    const { t } = this.props
    const title = bulkAnticipationsLabels[type] || '-'
    return {
      amount: currencyFormatter(amount),
      created_at: dateFormatter(created_at),
      title: t(title),
    }
  }

  getPendingRequests () {
    const {
      requests,
    } = this.props

    return map(this.getPendingRequest, requests)
  }

  getSummaryTotal () {
    const {
      search: { total },
      t,
    } = this.props
    return {
      outcoming: {
        title: t('balance.total.outcoming'),
        value: total.outcoming,
        unity: t('currency'),
      },
      outgoing: {
        title: t('balance.total.outgoing'),
        value: -total.outgoing,
        unity: t('currency'),
      },
      net: {
        title: t('balance.total.net'),
        value: total.net,
        unity: t('currency'),
      },
    }
  }

  getTypeLabels (label) {
    const { t } = this.props
    return t(label)
  }

  handleAnticipationClick () {
    const {
      balance: { available: { anticipation } },
      onAnticipationClick,
    } = this.props

    onAnticipationClick(anticipation)
  }

  handleChangeRecipientClick () {
    const {
      onChangeRecipientClick,
      recipient: { id },
    } = this.props

    onChangeRecipientClick(id)
  }

  handleDatesChange (dates) {
    const { onDateChange } = this.props
    onDateChange(dates)
  }

  handleOperationsPageChange (pageIndex) {
    const { onPageChange } = this.props
    onPageChange(pageIndex)
  }

  handleRequestCancelClick (requestIndex) {
    const {
      requests,
      onCancelRequestClick,
    } = this.props

    onCancelRequestClick(requests[requestIndex].id)
  }

  handleWithdrawalClick () {
    const {
      balance: { available: { withdrawal } },
      onWithdrawClick,
    } = this.props

    onWithdrawClick(withdrawal)
  }

  render () {
    const {
      balance: {
        amount,
        available: {
          withdrawal,
          anticipation,
        },
        outcoming,
      },
      dates,
      loading,
      onAnticipationClick,
      onCancelRequestClick,
      onChangeRecipientClick,
      onWithdrawClick,
      recipient,
      search: {
        operations,
      },
      t,
    } = this.props

    const anticipationAction = {
      disabled: loading,
      onClick: this.handleAnticipationClick,
      title: t('balance.anticipation'),
    }

    const headActions = [{
      disabled: loading,
      onClick: this.handleChangeRecipientClick,
      title: t('balance.recipient_change'),
    }]

    const withdrawalAction = {
      disabled: loading,
      onClick: this.handleWithdrawalClick,
      title: t('balance.withdrawal'),
    }

    return (
      <Grid>
        <Row stretch>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <DetailsHead
              actions={isNil(onChangeRecipientClick) ? null : headActions}
              identifier={recipient.id}
              properties={this.getHeadProperties()}
              title={t('balance.recipient')}
            />
          </Col>
        </Row>
        <Row stretch>
          <Col
            desk={4}
            palm={12}
            tablet={6}
            tv={4}
          >
            <BalanceTotalDisplay
              action={isNil(onWithdrawClick) ? null : withdrawalAction}
              amount={currencyFormatter(amount)}
              detail={
                <span>
                  {t('balance.available_withdrawal')}
                  <strong> {currencyFormatter(withdrawal)} </strong>
                </span>
              }
              title={t('balance.withdrawal_title')}
            />
          </Col>
          <Col
            desk={4}
            palm={12}
            tablet={6}
            tv={4}
          >
            <BalanceTotalDisplay
              action={isNil(onAnticipationClick) ? null : anticipationAction}
              amount={currencyFormatter(outcoming)}
              detail={
                <span>
                  {t('balance.available_withdrawal')}
                  <strong> {currencyFormatter(anticipation)} </strong>
                </span>
              }
              title={t('balance.anticipation_title')}
            />
          </Col>
          <Col
            desk={4}
            palm={12}
            tablet={6}
            tv={4}
          >
            <PendingRequests
              loading={loading}
              onCancel={isNil(onCancelRequestClick) ? null : this.handleRequestCancelClick}
              requests={this.getPendingRequests()}
              title={t('balance.pending_requests_title')}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardContent>
                <div> {t('operations.dates_title')} </div>
                <DateInput
                  active={dates.start && dates.end && true}
                  dates={dates}
                  disabled={loading}
                  icon={<IconCalendar width={16} height={16} />}
                  limits={dateLimits}
                  onChange={this.handleDatesChange}
                  presets={datePresets}
                />
              </CardContent>
              <CardContent>
                <BalanceSummary
                  amount={this.getSummaryTotal()}
                  dates={dates}
                />
              </CardContent>
              <CardContent>
                <Operations
                  columns={this.state.operationsColumns}
                  currentPage={normalizePage(1, operations.offset)}
                  exportLabel={t('operations.export')}
                  loading={loading}
                  ofLabel={t('of')}
                  onExport={() => null}
                  onPageChange={this.handleOperationsPageChange}
                  rows={operations.rows}
                  subtitle={t('operations.subtitle', operations.total)}
                  title={t('operations.title')}
                  totalPages={operations.count}
                />
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const cashFlowShape = PropTypes.arrayOf(
  PropTypes.shape({
    amount: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })
).isRequired

const numberOrStringShape = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
]).isRequired

Balance.propTypes = {
  balance: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    available: PropTypes.shape({
      anticipation: PropTypes.number.isRequired,
      withdrawal: PropTypes.number.isRequired,
    }),
    outcoming: PropTypes.number.isRequired,
  }).isRequired,
  dates: PropTypes.shape({
    end: PropTypes.instanceOf(moment),
    start: PropTypes.instanceOf(moment),
  }).isRequired,
  loading: PropTypes.bool,
  onAnticipationClick: PropTypes.func.isRequired,
  onCancelRequestClick: PropTypes.func.isRequired,
  onChangeRecipientClick: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onWithdrawClick: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    bank_account: PropTypes.shape({
      account: PropTypes.string.isRequired,
      agency: PropTypes.string.isRequired,
      bank_code: PropTypes.string.isRequired,
      id: numberOrStringShape,
      type: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    created_at: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  search: PropTypes.shape({
    operations: PropTypes.shape({
      count: PropTypes.number.isRequired,
      offset: PropTypes.number.isRequired,
      rows: PropTypes.arrayOf(
        PropTypes.shape({
          id: numberOrStringShape,
          net: PropTypes.number.isRequired,
          outcoming: cashFlowShape,
          outgoing: cashFlowShape,
          payment_date: PropTypes.shape({
            original: PropTypes.string,
            actual: PropTypes.string.isRequired,
          }),
          type: PropTypes.string.isRequired,
        })
      ),
      total: PropTypes.number.isRequired,
    }),
    total: PropTypes.shape({
      net: PropTypes.number.isRequired,
      outcoming: PropTypes.number.isRequired,
      outgoing: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

Balance.defaultProps = {
  loading: false,
}

export default Balance
