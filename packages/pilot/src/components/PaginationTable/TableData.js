import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'former-kit'
import withSpinner from '../withSpinner'

import style from './style.css'

const enhance = withSpinner(style.overlay)

const TableData = ({
  columns,
  disabled,
  emptyMessage,
  expandable,
  expandedRows,
  maxColumns,
  onExpandRow,
  onOrderChange,
  onRowClick,
  order,
  orderField,
  rows,
}) => (
  <Table
    columns={columns}
    disabled={disabled}
    emptyMessage={emptyMessage}
    expandable={expandable}
    expandedRows={expandedRows}
    maxColumns={maxColumns}
    onExpandRow={onExpandRow}
    onOrderChange={onOrderChange}
    onRowClick={onRowClick}
    orderSequence={order}
    orderColumn={orderField}
    rows={rows}
  />
)

TableData.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
  emptyMessage: PropTypes.string,
  expandable: PropTypes.bool,
  expandedRows: PropTypes.arrayOf(PropTypes.number),
  maxColumns: PropTypes.number,
  onExpandRow: PropTypes.func,
  onOrderChange: PropTypes.func,
  onRowClick: PropTypes.func,
  order: PropTypes.oneOf([
    'ascending', 'descending',
  ]),
  orderField: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TableData.defaultProps = {
  emptyMessage: null,
  expandable: false,
  expandedRows: [],
  maxColumns: 7,
  onExpandRow: null,
  onOrderChange: null,
  onRowClick: null,
  order: 'ascending',
  orderField: 0,
}

export default enhance(TableData)
