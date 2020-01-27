import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Row,
} from 'former-kit'

import currencyFormatter from '../../../formatters/currency'
import currencyToParts from '../../../formatters/currencyToParts'
import sufixNumber from '../../../formatters/sufixNumber'
import SpacedAmount from '../../../components/SpacedAmount'

import NoDataIcon from '../icons/no-data.svg'
import TotalAmountIcon from '../icons/total-amount-icon.svg'
import TotalTransactionsIcon from '../icons/total-transactions-icon.svg'

import MetricIndicator from '../../../components/MetricIndicator'
import MetricChart from '../../../components/MetricChart'

const PaymentLinkMetrics = ({
  localLoading,
  t,
  totalAmountByWeekday,
  totalAmountLinksPaid,
  totalLinksPaid,
}) => (
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
)

PaymentLinkMetrics.propTypes = {
  localLoading: PropTypes.shape({
    metrics: PropTypes.bool,
  }),
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
