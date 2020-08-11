import React from 'react'
import PropTypes from 'prop-types'
import {
  propOr,
  __,
} from 'ramda'

import SidebarSections from '../../components/SidebarSections'
import isPaymentLink from '../../validation/isPaymentLink'

import formatDecimalCurrency from '../../formatters/decimalCurrency'

const MINIMUM_API_VALUE = 100

const Sections = ({
  balance,
  companyType,
  onWithdraw,
  t,
  transfersPricing,
}) => {
  const getFrombalance = propOr(null, __, balance)
  const available = getFrombalance('available')

  const minimumWithdrawalValue = transfersPricing.ted + MINIMUM_API_VALUE
  const isCompanyNotPaymentLink = !!companyType && !isPaymentLink(companyType)

  return (
    <SidebarSections
      sections={[
        {
          action: onWithdraw,
          actionTitle: t('pages.sidebar.withdraw'),
          disabled: available <= minimumWithdrawalValue,
          showButton: isCompanyNotPaymentLink,
          title: t('pages.sidebar.available'),
          value: <span><small>{t('pages.sidebar.currency_symbol')}</small> {formatDecimalCurrency(available)}</span>,
        },
      ]}
    />
  )
}

Sections.propTypes = {
  balance: PropTypes.shape({
    available: PropTypes.number,
  }).isRequired,
  companyType: PropTypes.string,
  onWithdraw: PropTypes.func,
  t: PropTypes.func.isRequired,
  transfersPricing: PropTypes.shape({
    ted: PropTypes.number,
  }),
}

Sections.defaultProps = {
  companyType: '',
  onWithdraw: null,
  transfersPricing: {},
}

export default Sections
