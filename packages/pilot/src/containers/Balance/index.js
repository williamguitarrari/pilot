import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  isNil,
  keys,
  map,
  pipe,
  take,
} from 'ramda'
import {
  Button,
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
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleOperationsPageChange = this.handleOperationsPageChange.bind(this)
    this.handleRequestCancelClick = this.handleRequestCancelClick.bind(this)
    this.handleWithdrawalClick = this.handleWithdrawalClick.bind(this)

    const typesLabels = map(this.getTypeLabels, operationsTypesLabels)
    const translateColumns = getColumnsTranslator(this.props.t)
    this.state = {
      dateLabels: getDateLabels(this.props.t),
      operationsColumns: translateColumns(getColumns(typesLabels)),
    }
  }

  getHeadProp (key) {
    const {
      recipient: {
        bank_account, // eslint-disable-line camelcase
        id,
      },
      t,
    } = this.props
    const getTranslatedChild = () => {
      const childrenValue = bank_account[key]
      if (key === 'bank_code') {
        return t(`${key}.${childrenValue}`)
      }
      if (key === 'type') {
        return t(childrenValue)
      }
      if (key === 'id') {
        return id
      }
      return childrenValue
    }

    return ({
      children: <span>{getTranslatedChild()}</span>,
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
        id,
      },
    } = this.props

    return map(this.getHeadProp, keys({
      id,
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

    const getRequests = pipe(
      take(3),
      map(this.getPendingRequest)
    )

    return getRequests(requests)
  }

  getSummaryTotal () {
    const {
      search: { total },
      t,
    } = this.props
    return {
      outcoming: {
        title: t('balance.total.outcoming'),
        unit: t('currency'),
        value: total.outcoming,
      },
      outgoing: {
        title: t('balance.total.outgoing'),
        unit: t('currency'),
        value: -total.outgoing,
      },
      net: {
        title: t('balance.total.net'),
        unit: t('currency'),
        value: total.net,
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
          anticipation,
          withdrawal,
        },
        outcoming,
      },
      company,
      currentPage,
      dates,
      filterDisable,
      loading,
      onAnticipationClick,
      onCancelRequestClick,
      onFilterClick,
      onWithdrawClick,
      queryDates,
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

    const withdrawalAction = {
      disabled: loading,
      onClick: this.handleWithdrawalClick,
      title: t('balance.withdraw'),
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
              identifier={company.name}
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
              disabled={loading}
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
                  {t('balance.available_anticipation')}
                  <strong> {currencyFormatter(anticipation)} </strong>
                </span>
              }
              disabled={loading}
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
              emptyMessage={t('balance.pending_requests_empty_message')}
              loading={loading}
              onCancel={isNil(onCancelRequestClick) ? null : this.handleRequestCancelClick}
              requests={this.getPendingRequests()}
              title={t('balance.pending_requests_title')}
            />
          </Col>
        </Row>
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Card className={style.allowOverflow}>
              <CardContent>
                <div className={style.filter}>
                  <DateInput
                    active={queryDates.start && queryDates.end && true}
                    dates={queryDates}
                    disabled={loading}
                    icon={<IconCalendar width={16} height={16} />}
                    limits={dateLimits}
                    onChange={this.handleDatesChange}
                    presets={datePresets}
                    strings={this.state.dateLabels}
                  />
                  <Button
                    disabled={loading || filterDisable}
                    fill="gradient"
                    onClick={onFilterClick}
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
                />
              </CardContent>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Card>
              <Operations
                columns={this.state.operationsColumns}
                currentPage={currentPage}
                emptyMessage={t('operations.empty_message')}
                exportLabel={t('operations.export')}
                loading={loading}
                ofLabel={t('of')}
                onExport={() => null}
                onPageChange={this.handleOperationsPageChange}
                rows={operations.rows}
                subtitle={
                  t('operations.subtitle', { total: operations.total })
                }
                title={t('operations.title')}
                totalPages={operations.count}
              />
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

const datesShape = PropTypes.shape({
  end: PropTypes.instanceOf(moment),
  start: PropTypes.instanceOf(moment),
})

Balance.propTypes = {
  balance: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    available: PropTypes.shape({
      anticipation: PropTypes.number.isRequired,
      withdrawal: PropTypes.number.isRequired,
    }),
    outcoming: PropTypes.number.isRequired,
  }).isRequired,
  company: PropTypes.shape({
    id: numberOrStringShape.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  dates: datesShape.isRequired, // eslint-disable-line react/no-typos
  filterDisable: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onAnticipationClick: PropTypes.func,
  onCancelRequestClick: PropTypes.func,
  onDateChange: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onWithdrawClick: PropTypes.func,
  queryDates: datesShape.isRequired, // eslint-disable-line react/no-typos
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
  onAnticipationClick: null,
  onCancelRequestClick: null,
  onWithdrawClick: null,
}

export default Balance
