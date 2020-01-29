import React, {
  Fragment,
  useReducer,
} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import {
  Button,
  Col,
  DateSelector,
  Flexbox,
  Row,
  SpacedSegmentedSwitch,
  Spacing,
} from 'former-kit'
import {
  applySpec,
  complement,
  filter,
  map,
  pipe,
  prop,
  propEq,
} from 'ramda'
import Calendar24 from 'emblematic-icons/svg/Calendar24.svg'

import styles from './style.css'

import translateDateInput from '../../../formatters/dateInputTranslator'
import currencyFormatter from '../../../formatters/currency'
import currencyToParts from '../../../formatters/currencyToParts'
import sufixNumber from '../../../formatters/sufixNumber'
import SpacedAmount from '../../../components/SpacedAmount'

import NoDataIcon from '../icons/no-data.svg'
import TotalAmountIcon from '../icons/total-amount-icon.svg'
import TotalTransactionsIcon from '../icons/total-transactions-icon.svg'

import MetricIndicator from '../../../components/MetricIndicator'
import MetricChart from '../../../components/MetricChart'

const initialState = {
  selectedPreset: '',
  showCalendar: false,
}

const buildDates = (daysToAdd) => {
  const now = moment()
  const start = moment().add(daysToAdd, 'days')

  return {
    end: now,
    start,
  }
}

const findPresetFromKey = (presets, presetKey) => presets
  .find(({ key }) => key === presetKey)

const reducer = (prevState, updatedState) => ({
  ...prevState,
  ...updatedState,
})

const excludeCustomPreset = filter(
  complement(propEq('key', 'custom'))
)

const getOptionsFromPresets = pipe(
  excludeCustomPreset,
  map(applySpec({
    title: prop('label'),
    value: prop('key'),
  }))
)

const PaymentLinkMetrics = ({
  localLoading,
  onDateConfirm,
  presets,
  t,
  totalAmountByWeekday,
  totalAmountLinksPaid,
  totalLinksPaid,
}) => {
  const [state, setState] = useReducer(reducer, initialState)

  const isUsingCustomDates = state.selectedPreset === 'custom'

  const handleDateChange = (rangeDates) => {
    setState({
      confirmDisabled: false,
      dates: rangeDates,
    })
  }

  const handlePeriodChange = () => {
    setState({
      showCalendar: false,
    })
    onDateConfirm(state.dates)
  }

  const handlePresetChange = (presetKey) => {
    setState({
      selectedPreset: presetKey,
      showCalendar: false,
    })

    const preset = findPresetFromKey(presets, presetKey)

    const range = buildDates(preset.date())
    onDateConfirm(range, preset)
  }

  return (
    <Fragment>
      <Flexbox
        alignItems="center"
        className={styles.dates}
      >
        <Spacing size="medium" />
        <SpacedSegmentedSwitch
          name="home-date-preset"
          options={getOptionsFromPresets(presets)}
          onChange={handlePresetChange}
          relevance="low"
          spacing="tiny"
          value={state.selectedPreset}
        />
        <Spacing size="tiny" />
        <div className={styles.dateSelectorContainer}>
          <DateSelector
            dates={state.dates}
            placement="bottomEnd"
            isValidDay={date => moment().isSameOrAfter(date)}
            onChange={handleDateChange}
            onConfirm={handlePeriodChange}
            selectionMode="period"
            showSidebar={false}
            strings={translateDateInput(t)}
            visible={state.showCalendar}
          >
            <Button
              fill="clean"
              icon={(
                <Calendar24
                  color={isUsingCustomDates
                    ? '#37cc9a'
                    : '#4d4f62'
                  }
                  height={13}
                  width={13}
                />
              )}
              onClick={() => setState({ showCalendar: true })}
            />
          </DateSelector>
        </div>
      </Flexbox>
      <Row flex stretch>
        <Col
          desk={3}
          palm={12}
          tablet={6}
          tv={3}
        >
          <MetricIndicator
            icon={<TotalTransactionsIcon />}
            loading={localLoading.metrics}
            title={t('pages.payment_links.links_paid')}
            value={totalLinksPaid}
          />
        </Col>
        <Col
          desk={3}
          palm={12}
          tablet={6}
          tv={3}
        >
          <MetricIndicator
            icon={<TotalAmountIcon />}
            loading={localLoading.metrics}
            title={t('pages.payment_links.amount_paid')}
            value={(
              <SpacedAmount
                {...currencyToParts(totalAmountLinksPaid)}
              />
            )}
          />
        </Col>
        <Col
          desk={6}
          palm={12}
          tablet={12}
          tv={6}
        >
          <MetricChart
            chartLegend={t('pages.payment_links.weekly_volume')}
            emptyIcon={<NoDataIcon />}
            emptyText={t('pages.payment_links.empty.weekly_volume')}
            loading={localLoading.metrics}
            styles={{
              barSize: 15,
              colors: {
                dot: '#7052c8',
                fill: '#7052c8',
                fontSize: 11,
                line: '#7052c8',
              },
              height: 150,
              margin: {
                right: 30,
              },
            }}
            tickFormatter={amount => sufixNumber(amount / 100)}
            tooltip={{
              labelFormatter: () => t('pages.payment_links.total_amount'),
              valueFormatter: amount => [currencyFormatter(amount)],
            }}
            type="area"
            data={totalAmountByWeekday}
            title={t('pages.payment_links.total_amount_by_weekday')}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

PaymentLinkMetrics.propTypes = {
  localLoading: PropTypes.shape({
    metrics: PropTypes.bool,
  }),
  onDateConfirm: PropTypes.func.isRequired,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.func,
      label: PropTypes.string,
    })
  ).isRequired,
  t: PropTypes.func.isRequired,
  totalAmountByWeekday: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number,
    })
  ).isRequired,
  totalAmountLinksPaid: PropTypes.number.isRequired,
  totalLinksPaid: PropTypes.number.isRequired,
}

PaymentLinkMetrics.defaultProps = {
  localLoading: {},
}

export default PaymentLinkMetrics
