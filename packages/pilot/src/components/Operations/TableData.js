import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'former-kit'
import withLoader from '../withLoader'

import style from './style.css'

/* eslint-disable */
const withSpinner = withLoader(
  <div className={style.overlay}>
    <span className={style.spinner} />
  </div>
)
/* eslint-enable */

const TableData = ({
  columns,
  disabled,
  emptyMessage,
  rows,
}) => (
  <Table
    columns={columns}
    disabled={disabled}
    emptyMessage={emptyMessage}
    maxColumns={6}
    rows={rows}
  />
)

const outShape = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})

TableData.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.arrayOf(PropTypes.string).isRequired,
    orderable: PropTypes.bool.isRequired,
    renderer: PropTypes.func,
    title: PropTypes.string.isRequired,
  })).isRequired,
  disabled: PropTypes.bool.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    net: PropTypes.number.isRequired,
    outcoming: PropTypes.arrayOf(outShape).isRequired,
    outgoing: PropTypes.arrayOf(outShape).isRequired,
    payment_date: PropTypes.shape({
      actual: PropTypes.string,
      original: PropTypes.string,
    }).isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
}

export default withSpinner(TableData)
