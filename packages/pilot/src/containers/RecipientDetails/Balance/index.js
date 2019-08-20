import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  either,
  isEmpty,
  isNil,
  map,
  pipe,
  propSatisfies,
  take,
} from 'ramda'

import {
  Button,
  CardContent,
  CardSection,
  Col,
  DateInput,
  Grid,
  Row,
  Spacing,
  Tooltip,
} from 'former-kit'

import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'

import BalanceSummary from '../../../components/BalanceSummary'
import BalanceTotalDisplay from '../../../components/BalanceTotalDisplay'
import bulkAnticipationsLabels from '../../../models/bulkAnticipationTypes'
import currencyFormatter from '../../../formatters/currency'
import dateFormatter from '../../../formatters/longDate'
import dateLimits from '../../../models/dateSelectorLimits'
import datePresets from '../../../models/dateSelectorPresets'
import getColumns from '../../../components/Operations/operationsTableColumns'
import getColumnsTranslator from '../../../formatters/columnTranslator'
import Operations from '../../../components/Operations'
import operationsTypesLabels from '../../../models/operationTypes'
import PendingRequests from '../../../components/PendingRequests'
import style from './style.css'

const getDateLabels = t => ({
  anyDate: t('dates.any'),
  cancel: t('dates.cancel'),
  confirmPeriod: t('dates.confirm'),
  custom: t('dates.custom'),
  day: t('dates.day'),
  daySelected: t('dates.day_selected'),
  daysSelected: t('dates.selected'),
  end: t('dates.end'),
  noDayOrPeriodSelected: t('dates.no_selected'),
  period: t('dates.period'),
  select: t('dates.select'),
  start: t('dates.start'),
  today: t('dates.today'),
})

const datesEqual = (left, right) => {
  if (left.start === right.start && left.end === right.end) {
    return true
  }

  return (
    moment(left.start).diff(moment(right.start), 'days') === 0
    && moment(right.end).diff(moment(right.end), 'days') === 0
  )
}

const isEmptyDates = either(
  propSatisfies(isNil, 'end'),
  propSatisfies(isNil, 'start')
)

const anyDateRange = {
  end: moment(),
  start: moment().subtract(3, 'months'),
}

const formatAmount = (amount = 0) => currencyFormatter(amount)

class RecipientBalance extends Component {
  constructor (props) {
    super(props)

    this.getPendingRequest = this.getPendingRequest.bind(this)
    this.getPendingRequests = this.getPendingRequests.bind(this)
    this.getSummaryTotal = this.getSummaryTotal.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleOperationsPageChange = this.handleOperationsPageChange.bind(this)
    this.handleRequestCancelClick = this.handleRequestCancelClick.bind(this)
    this.renderAnticipation = this.renderAnticipation.bind(this)
    this.handlePresetChange = this.handlePresetChange.bind(this)

    this.localizedPresets = datePresets(props.t, 'past')

    this.state = {
      dates: props.dates,
      showDateInputCalendar: false,
    }
  }

  getPendingRequest ({
    amount,
    created_at: createdAt,
    status,
    type,
  }) {
    const { t } = this.props
    const {
      statuses,
      types,
    } = bulkAnticipationsLabels

    return {
      amount: currencyFormatter(amount),
      created_at: dateFormatter(createdAt),
      title: `${t(types[type])} ${t(statuses[status])}` || '-',
    }
  }

  getPendingRequests () {
    const {
      requests,
    } = this.props

    const getRequests = pipe(
      take(3),
      map(this.getPendingRequest)
    )

    return getRequests(requests)
  }

  getSummaryTotal () {
    const {
      disabled,
      t,
      total,
    } = this.props

    if (!isEmpty(total)) {
      /* eslint-disable sort-keys */
      return {
        outcoming: {
          title: t('pages.balance.total.outcoming'),
          unit: t('currency'),
          value: disabled
            ? 0
            : total.outcoming,
        },
        outgoing: {
          title: t('pages.balance.total.outgoing'),
          unit: t('currency'),
          value: disabled
            ? 0
            : -total.outgoing,
        },
        net: {
          title: t('pages.balance.total.net'),
          unit: t('currency'),
          value: disabled
            ? 0
            : total.net,
        },
      }
      /* eslint-enable sort-keys */
    }

    return null
  }

  handleDatesChange (dates) {
    this.setState({ dates })
  }

  handleFilterClick () {
    const { onFilterClick } = this.props
    const { dates } = this.state
    if (isEmptyDates(dates)) {
      onFilterClick(anyDateRange)
    } else {
      onFilterClick(dates)
    }
  }

  handleOperationsPageChange (pageIndex) {
    const { onPageChange } = this.props
    onPageChange(pageIndex)
  }

  handleRequestCancelClick (requestIndex) {
    const {
      onCancelRequestClick,
      requests,
    } = this.props

    onCancelRequestClick(requests[requestIndex].id)
  }

  handlePresetChange () {
    this.setState({
      showDateInputCalendar: true,
    })
  }

  renderAnticipation () {
    const {
      anticipation: {
        automaticTransfer,
        available,
        error,
        loading,
      },
      t,
    } = this.props

    if (loading) {
      return (
        <span>
          {t('pages.balance.anticipation_loading')}
        </span>
      )
    }

    if (error) {
      return (
        <span>
          {t('pages.balance.anticipation_error')}
          <Spacing size="tiny" />
          <Tooltip
            placement="rightMiddle"
            content={t('pages.balance.anticipation_error_info')}
          >
            <IconInfo height={16} width={16} />
          </Tooltip>
        </span>
      )
    }

    if (available === 0) {
      return (
        <span>
          {t('pages.balance.no_anticipation')}
        </span>
      )
    }

    if (automaticTransfer) {
      return (
        <div>
          <p>{t('pages.balance.anticipation_call')}</p>
        </div>
      )
    }

    return (
      <span>
        {t('pages.balance.available_anticipation')}
        <strong> {formatAmount(available)} </strong>
      </span>
    )
  }

  render () {
    const {
      anticipation: {
        available: availableAnticipation,
        error: anticipationError,
        loading: anticipationLoading,
      },
      balance: {
        amount,
        available: {
          withdrawal,
        },
        outcoming,
      },
      currentPage,
      dates,
      disabled,
      exporting,
      itemsPerPage,
      loading,
      onAnticipationClick,
      onCancelRequestClick,
      onExport,
      onPageCountChange,
      onWithdrawClick,
      pageSizeOptions,
      search: {
        operations,
      },
      t,
    } = this.props

    const { showDateInputCalendar } = this.state

    const translateColumns = getColumnsTranslator(t)
    const typesLabels = map(t, operationsTypesLabels)

    const anticipationAction = {
      disabled,
      onClick: onAnticipationClick,
      title: t('pages.balance.anticipation'),
    }

    const withdrawalAction = {
      disabled,
      onClick: onWithdrawClick,
      title: t('pages.balance.withdraw'),
    }

    const filterDatesEqualCurrent = datesEqual(this.state.dates, dates) // eslint-disable-line

    const shouldDisableAnticipation = (
      disabled
      || anticipationLoading
      || anticipationError
      || availableAnticipation === 0
    )

    return (
      <CardContent>
        <Grid>
          <Row stretch>
            <Col
              desk={4}
              palm={12}
              tablet={6}
              tv={4}
            >
              <CardSection>
                <BalanceTotalDisplay
                  action={isNil(onWithdrawClick)
                    ? null
                    : withdrawalAction}
                  amount={amount}
                  detail={(
                    <span>
                      {t('pages.balance.available_withdrawal')}
                      <strong> {formatAmount(withdrawal)} </strong>
                    </span>
                  )}
                  disabled={disabled}
                  title={t('pages.balance.withdrawal_title')}
                />
              </CardSection>
            </Col>
            <Col
              desk={4}
              palm={12}
              tablet={6}
              tv={4}
            >
              <CardSection>
                <BalanceTotalDisplay
                  action={isNil(onAnticipationClick)
                    ? null
                    : anticipationAction}
                  amount={outcoming}
                  detail={this.renderAnticipation()}
                  disabled={shouldDisableAnticipation}
                  title={t('pages.balance.anticipation_title')}
                />
              </CardSection>
            </Col>
            <Col
              desk={4}
              palm={12}
              tablet={6}
              tv={4}
            >
              <CardSection>
                <PendingRequests
                  emptyMessage={t('pages.balance.pending_requests_empty_message')}
                  loading={disabled}
                  onCancel={isNil(onCancelRequestClick)
                    ? null
                    : this.handleRequestCancelClick}
                  requests={this.getPendingRequests()}
                  title={t('pages.balance.pending_requests_title')}
                />
              </CardSection>
            </Col>
          </Row>
          <Row>
            <Col
              desk={12}
              palm={12}
              tablet={12}
              tv={12}
            >
              <CardSection>
                <CardContent>
                  <div className={style.filter}>
                    <DateInput
                      active={filterDatesEqualCurrent}
                      disabled={disabled}
                      icon={<IconCalendar width={16} height={16} />}
                      limits={dateLimits}
                      onChange={this.handleDatesChange}
                      onPresetChange={this.handlePresetChange}
                      presets={this.localizedPresets}
                      selectedPreset="days-7"
                      strings={getDateLabels(t)}
                      showCalendar={showDateInputCalendar}
                      dates={this.state.dates} // eslint-disable-line
                    />
                    <Button
                      disabled={filterDatesEqualCurrent}
                      fill="gradient"
                      onClick={this.handleFilterClick}
                      size="default"
                    >
                      {t('filter_action')}
                    </Button>
                  </div>
                </CardContent>
                <CardContent>
                  <BalanceSummary
                    amount={this.getSummaryTotal()}
                    dates={dates}
                    loading={loading}
                    base="light"
                  />
                </CardContent>
                <CardContent>
                  <Operations
                    columns={translateColumns(getColumns(typesLabels))}
                    currentPage={currentPage}
                    dates={dates}
                    disabled={disabled}
                    emptyMessage={t('models.operations.empty_message')}
                    exportLabel={t('models.operations.export')}
                    exporting={exporting}
                    itemsPerPage={itemsPerPage}
                    loading={disabled || loading}
                    labels={{
                      empty: t('models.operations.empty_message'),
                      exportCall: t('export_table'),
                      exportTo: t('export_to'),
                      results: t(
                        'pages.balance.results',
                        { count: operations.total }
                      ),
                      totalOf: t('pages.balance.total.of'),
                    }}
                    onPageChange={this.handleOperationsPageChange}
                    onPageCountChange={onPageCountChange}
                    onExport={onExport}
                    pageSizeOptions={pageSizeOptions}
                    rows={operations.rows}
                    t={t}
                    title={t('pages.balance.operations_title')}
                    totalPages={operations.count}
                  />
                </CardContent>
              </CardSection>
            </Col>
          </Row>
        </Grid>
      </CardContent>
    )
  }
}

const cashFlowShape = PropTypes.arrayOf(PropTypes.shape({
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})).isRequired

const numberOrStringShape = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
]).isRequired

RecipientBalance.propTypes = {
  anticipation: PropTypes.shape({
    available: PropTypes.number,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  balance: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    available: PropTypes.shape({
      withdrawal: PropTypes.number.isRequired,
    }),
    outcoming: PropTypes.number.isRequired,
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  dates: PropTypes.shape({
    end: PropTypes.instanceOf(moment),
    start: PropTypes.instanceOf(moment),
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  exporting: PropTypes.bool.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onAnticipationClick: PropTypes.func.isRequired,
  onCancelRequestClick: PropTypes.func,
  onExport: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  onWithdrawClick: PropTypes.func.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
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
      rows: PropTypes.arrayOf(PropTypes.shape({
        id: numberOrStringShape,
        net: PropTypes.number.isRequired,
        outcoming: cashFlowShape,
        outgoing: cashFlowShape,
        payment_date: PropTypes.shape({
          actual: PropTypes.string.isRequired,
          original: PropTypes.string,
        }),
        sourceId: PropTypes.string,
        targetId: PropTypes.string,
        type: PropTypes.string.isRequired,
      })),
      total: PropTypes.number.isRequired,
    }),
  }).isRequired,
  t: PropTypes.func.isRequired,
  total: PropTypes.shape({
    net: PropTypes.number,
    outcoming: PropTypes.number,
    outgoing: PropTypes.number,
  }),
}

RecipientBalance.defaultProps = {
  onCancelRequestClick: null,
  pageSizeOptions: [15, 30, 60, 100],
  total: {},
}

export default RecipientBalance
