import React from 'react'
import PropTypes from 'prop-types'
import { isMomentPropValidation } from 'former-kit'
import moment from 'moment-timezone'

import PaginationTable from '../PaginationTable'
import Title from './Title'

const Operations = ({
  columns,
  count,
  currentPage,
  dates: {
    end,
    start,
  },
  disabled,
  exporting,
  itemsPerPage,
  labels,
  loading,
  onExport,
  onPageChange,
  onPageCountChange,
  pageSizeOptions,
  rows,
  subtitle,
  totalPages,
}) => {
  const isTodayPreset = moment(start).isSame(end, 'day')

  return (
    <PaginationTable
      columns={columns}
      count={count}
      currentPage={currentPage}
      disabled={disabled}
      exporting={exporting}
      itemsPerPage={itemsPerPage}
      labels={labels}
      loading={loading}
      onExport={onExport}
      onPageChange={onPageChange}
      onPageCountChange={onPageCountChange}
      pageSizeOptions={pageSizeOptions}
      rows={rows}
      subtitle={subtitle}
      title={(
        <Title
          count={count}
          date={{
            end,
            start,
          }}
          isTodayPreset={isTodayPreset}
          labels={labels}
        />
      )}
      totalPages={totalPages}
    />
  )
}

const outShape = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})

Operations.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.arrayOf(PropTypes.string).isRequired,
    orderable: PropTypes.bool.isRequired,
    renderer: PropTypes.func,
    title: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  dates: PropTypes.shape({
    end: isMomentPropValidation.isRequired,
    start: isMomentPropValidation.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  exporting: PropTypes.bool.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  labels: PropTypes.shape({
    empty: PropTypes.string.isRequired,
    exportCall: PropTypes.string.isRequired,
    exportTo: PropTypes.string.isRequired,
    results: PropTypes.string,
    totalOf: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool,
  onExport: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    net: PropTypes.number.isRequired,
    outcoming: PropTypes.arrayOf(outShape).isRequired,
    outgoing: PropTypes.arrayOf(outShape).isRequired,
    paymentDate: PropTypes.shape({
      actual: PropTypes.string,
      original: PropTypes.string,
    }).isRequired,
    sourceId: PropTypes.string,
    targetId: PropTypes.string,
    transactionId: PropTypes.number,
    type: PropTypes.string.isRequired,
  })).isRequired,
  subtitle: PropTypes.node,
  totalPages: PropTypes.number.isRequired,
}

Operations.defaultProps = {
  count: null,
  disabled: false,
  loading: false,
  onExport: null,
  subtitle: null,
}

export default Operations
