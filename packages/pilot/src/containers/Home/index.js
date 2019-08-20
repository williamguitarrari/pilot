import React, {
  Fragment,
} from 'react'
import PropTypes from 'prop-types'
import { isMomentPropValidation } from 'former-kit'
import Header from './Header'
import Content from './Content'

const HomeContainer = ({
  averageAmount,
  cardBrands,
  dates,
  isEmptySearch,
  labels,
  loading,
  localLoading,
  onDateConfirm,
  paymentMethods,
  presets,
  refuseReasons,
  selectedPreset,
  t,
  totalAmount,
  totalAmountByWeekday,
  totalTransactions,
  transactionsByInstallment,
  transactionsByStatus,
}) => (
  <Fragment>
    <Header
      dates={dates}
      labels={labels}
      onDateConfirm={onDateConfirm}
      presets={presets}
      selectedPreset={selectedPreset}
      t={t}
    />
    <Content
      averageAmount={averageAmount}
      cardBrands={cardBrands}
      isEmpty={isEmptySearch}
      labels={labels}
      loading={loading}
      localLoading={localLoading}
      onDateConfirm={onDateConfirm}
      paymentMethods={paymentMethods}
      refuseReasons={refuseReasons}
      t={t}
      totalAmount={totalAmount}
      totalAmountByWeekday={totalAmountByWeekday}
      totalTransactions={totalTransactions}
      transactionsByInstallment={transactionsByInstallment}
      transactionsByStatus={transactionsByStatus}
    />
  </Fragment>
)

HomeContainer.propTypes = {
  averageAmount: PropTypes.number.isRequired,
  cardBrands: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      value: PropTypes.string,
    })
  ).isRequired,
  dates: PropTypes.shape({
    end: isMomentPropValidation,
    start: isMomentPropValidation,
  }).isRequired,
  isEmptySearch: PropTypes.bool,
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
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.func,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  refuseReasons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      value: PropTypes.string,
    })
  ).isRequired,
  selectedPreset: PropTypes.string.isRequired,
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

HomeContainer.defaultProps = {
  isEmptySearch: false,
  loading: false,
  localLoading: {},
}

export default HomeContainer
