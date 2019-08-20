import React from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Flexbox,
  Grid,
  Row,
} from 'former-kit'
import classNames from 'classnames'
import withSpinner from '../../components/withSpinner'
import AverageAmountIcon from './icons/average-amount-icon.svg'
import currencyFormatter from '../../formatters/currency'
import currencyToParts from '../../formatters/currencyToParts'
import MetricChart from '../../components/MetricChart'
import MetricIndicator from '../../components/MetricIndicator'
import MetricList from '../../components/MetricList'
import TotalAmountIcon from './icons/total-amount-icon.svg'
import TotalTransactionsIcon from './icons/total-transactions-icon.svg'
import SpacedAmount from './SpacedAmount'
import NoDataIcon from './icons/no-data.svg'
import { Message } from '../../components/Message'
import EmptyStateIcon from './icons/empty-state-global.svg'

import styles from './style.css'

const enhance = withSpinner(styles.overlay)

const Content = ({
  averageAmount,
  cardBrands,
  isEmpty,
  loading,
  localLoading,
  paymentMethods,
  refuseReasons,
  t,
  totalAmount,
  totalAmountByWeekday,
  totalTransactions,
  transactionsByInstallment,
  transactionsByStatus,
}) => (
  <div className={styles.content}>
    {!isEmpty && (
    <Grid className={classNames(
      styles.grid, {
        [styles.globalLoading]: loading || isEmpty,
      }
    )}
    >
      <Row flex stretch>
        <Col
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <Flexbox className={styles.column} direction="column">
            <MetricIndicator
              loading={localLoading.metrics}
              icon={<TotalTransactionsIcon />}
              title={t('pages.home.total_transactions')}
              value={totalTransactions}
            />
            <MetricList
              emptyIcon={<NoDataIcon />}
              emptyText={t('pages.home.empty.payment_methods')}
              items={paymentMethods}
              loading={localLoading.metrics}
              title={t('pages.home.payment_methods')}
            />
          </Flexbox>
        </Col>
        <Col
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <Flexbox className={styles.column} direction="column">
            <MetricIndicator
              loading={localLoading.metrics}
              icon={<AverageAmountIcon />}
              title={t('pages.home.average_amount')}
              value={(
                <SpacedAmount
                  {...currencyToParts(averageAmount)}
                />
              )}
            />
            <MetricList
              emptyIcon={<NoDataIcon />}
              emptyText={t('pages.home.empty.most_used_card_brands')}
              items={cardBrands}
              loading={localLoading.metrics}
              title={t('pages.home.most_used_card_brands')}
            />
          </Flexbox>
        </Col>
        <Col
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <Flexbox className={styles.column} direction="column">
            <MetricIndicator
              loading={localLoading.metrics}
              icon={<TotalAmountIcon />}
              title={t('pages.home.total_amount')}
              value={(
                <SpacedAmount
                  {...currencyToParts(totalAmount)}
                />
              )}
            />
            <MetricList
              emptyIcon={<NoDataIcon />}
              emptyText={t('pages.home.empty.refusal_rate')}
              items={refuseReasons}
              loading={localLoading.metrics}
              title={t('pages.home.refusal_rate')}
            />
          </Flexbox>
        </Col>
        <Col
          className={styles.sideColumn}
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <MetricChart
            data={transactionsByStatus}
            emptyIcon={<NoDataIcon />}
            emptyText={t('pages.home.empty.transactions_by_status')}
            loading={localLoading.metrics}
            showLegend
            styles={{
              height: 150,
              innerRadius: 30,
            }}
            title={t('pages.home.transactions_by_status')}
            type="donut"
          />
        </Col>
      </Row>
      <Row flex stretch>
        <Col
          className={styles.bottomColumn}
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <MetricChart
            chartLegend={t('pages.home.total_transactions')}
            emptyIcon={<NoDataIcon />}
            emptyText={t('pages.home.empty.total_transactions')}
            loading={localLoading.metrics}
            styles={{
              barSize: 15,
              colors: {
                fill: '#17c9b2',
              },
              fontSize: 11,
              height: 150,
              margin: {
                right: 30,
              },
            }}
            tooltip={{
              labelFormatter: () => t('pages.home.total_transactions'),
            }}
            type="bar"
            data={transactionsByInstallment}
            title={t('pages.home.transactions_by_installment')}
          />
        </Col>
        <Col
          className={styles.bottomColumn}
          desk={3}
          palm={6}
          tablet={6}
          tv={3}
        >
          <MetricChart
            chartLegend={t('pages.home.weekly_volume')}
            emptyIcon={<NoDataIcon />}
            emptyText={t('pages.home.empty.weekly_volume')}
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
            tickFormatter={amount => amount / 100}
            tooltip={{
              labelFormatter: () => t('pages.home.total_amount'),
              valueFormatter: amount => [currencyFormatter(amount)],
            }}
            type="area"
            data={totalAmountByWeekday}
            title={t('pages.home.total_amount_by_weekday')}
          />
        </Col>
      </Row>
    </Grid>
    )}
    {isEmpty && (
      <Flexbox
        alignItems="center"
        justifyContent="center"
        className={classNames(styles.emptyState, {
          [styles.globalLoading]: loading,
        })}
      >
        <Message
          image={<EmptyStateIcon width={340} height={190} />}
          message={(
            <div className={styles.emptyStateMessage}>
              <div>{t('pages.home.empty.general_message')}</div>
              <div>{t('pages.home.empty.general_try_again')}</div>
            </div>
          )}
        />
      </Flexbox>
    )}
  </div>
)

Content.propTypes = {
  averageAmount: PropTypes.number.isRequired,
  cardBrands: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      value: PropTypes.string,
    })
  ).isRequired,
  isEmpty: PropTypes.bool,
  labels: PropTypes.shape({
    description: PropTypes.node.isRequired,
    greeting: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
  localLoading: PropTypes.shape({
    metrics: PropTypes.bool,
  }),
  onDateConfirm: PropTypes.func.isRequired,
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      value: PropTypes.string,
    })
  ).isRequired,
  refuseReasons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      value: PropTypes.string,
    })
  ).isRequired,
  t: PropTypes.func.isRequired,
  totalAmount: PropTypes.number.isRequired,
  totalAmountByWeekday: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number,
    })
  ).isRequired,
  totalTransactions: PropTypes.number.isRequired,
  transactionsByInstallment: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
  transactionsByStatus: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
}

Content.defaultProps = {
  isEmpty: false,
  loading: false,
  localLoading: {},
}

export default enhance(Content)
