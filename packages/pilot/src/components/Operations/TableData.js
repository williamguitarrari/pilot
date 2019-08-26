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
  onRowClick,
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
    onRowClick={onRowClick}
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
  onRowClick: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TableData.defaultProps = {
  emptyMessage: null,
  expandable: false,
  expandedRows: [],
  maxColumns: 7,
  onExpandRow: null,
  onRowClick: null,
}

export default enhance(TableData)
