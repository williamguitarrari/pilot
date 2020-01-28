import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Filter from './Filter'

import dateSelectorPresets from '../../../models/dateSelectorPresets'
import style from './style.css'


const PaymentLinksList = ({
  disabled,
  filter,
  onFilterChange,
  onFilterClear,
  onFilterConfirm,
  t,
}) => (
  <Fragment>
    <Filter
      className={style.filter}
      dateSelectorPresets={dateSelectorPresets(t)}
      disabled={disabled}
      onChange={onFilterChange}
      onClear={onFilterClear}
      onConfirm={onFilterConfirm}
      query={filter}
      t={t}
    />
  </Fragment>
)

PaymentLinksList.propTypes = {
  disabled: PropTypes.bool,
  filter: PropTypes.shape({
    dates: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    statuses: PropTypes.string.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
  onFilterConfirm: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

PaymentLinksList.defaultProps = {
  disabled: false,
}

export default PaymentLinksList
