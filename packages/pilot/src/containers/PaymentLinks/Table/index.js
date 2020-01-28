import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { isMomentPropValidation } from 'former-kit'
import copyToClipBoard from 'clipboard-copy'

import Filter from './Filter'
import TableList from './TableList'

import dateSelectorPresets from '../../../models/dateSelectorPresets'
import style from './style.css'

const pageSizeOptions = [15, 30, 60, 100]

const PaymentLinksList = ({
  currentPage,
  data,
  disabled,
  exporting,
  filter,
  itemsPerPage,
  loading,
  onExport,
  onFilterChange,
  onFilterClear,
  onFilterConfirm,
  onOrderChange,
  onPageChange,
  onPageCountChange,
  onRowClick,
  order,
  orderField,
  t,
  totalPages,
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
    <TableList
      currentPage={currentPage}
      data={data}
      disabled={disabled}
      exporting={exporting}
      itemsPerPage={itemsPerPage}
      loading={loading}
      onExport={onExport}
      onOrderChange={onOrderChange}
      onPageChange={onPageChange}
      onPageCountChange={onPageCountChange}
      onRowClick={onRowClick}
      onUrlCopy={copyToClipBoard}
      order={order}
      orderField={orderField}
      pageSizeOptions={pageSizeOptions.map(i => ({
        name: `items_per_page ${i}`,
        value: `${i}`,
      }))}
      t={t}
      totalPages={totalPages}
    />
  </Fragment>
)

PaymentLinksList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    date_created: isMomentPropValidation,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    })),
    paid_amount: PropTypes.number.isRequired,
    statuses: PropTypes.arrayOf(PropTypes.oneOf([
      'available', 'inactive', 'paid',
    ])).isRequired,
    url: PropTypes.string.isRequired,
  })),
  disabled: PropTypes.bool,
  exporting: PropTypes.bool,
  filter: PropTypes.shape({
    dates: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    statuses: PropTypes.string.isRequired,
  }).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onExport: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
  onFilterConfirm: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf([
    'ascending', 'descending',
  ]),
  orderField: PropTypes.number,
  t: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
}

PaymentLinksList.defaultProps = {
  data: [],
  disabled: false,
  exporting: false,
  loading: false,
  order: 'ascending',
  orderField: 0,
}

export default PaymentLinksList
