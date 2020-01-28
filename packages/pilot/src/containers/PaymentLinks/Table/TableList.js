import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  isMomentPropValidation,
} from 'former-kit'

import PaginationTable from '../../../components/PaginationTable'

import tableColumns from './tableColumns'
import style from './style.css'

const TableList = ({
  currentPage,
  data,
  disabled,
  exporting,
  itemsPerPage,
  loading,
  onExport,
  onOrderChange,
  onPageChange,
  onPageCountChange,
  onRowClick,
  onUrlCopy,
  order,
  orderField,
  pageSizeOptions,
  t,
  totalPages,
}) => (
  <Card>
    <CardContent>
      <PaginationTable
        className={style.table}
        columns={tableColumns({ onUrlCopy, t })}
        currentPage={currentPage}
        disabled={disabled}
        exporting={exporting}
        itemsPerPage={itemsPerPage}
        labels={{
          empty: t('models.operations.empty_message'),
          exportCall: t('export_table'),
          exportTo: t('export_to'),
          totalOf: t('pages.balance.total_of'),
        }}
        loading={loading}
        onExport={onExport}
        onOrderChange={onOrderChange}
        onPageChange={onPageChange}
        onPageCountChange={onPageCountChange}
        onRowClick={onRowClick}
        order={order}
        orderField={orderField}
        pageSizeOptions={pageSizeOptions}
        paginationFormat="range"
        rows={data}
        title={(
          <h2 className={style.tableTitle}>
            {t('pages.payment_links.table_title')}
          </h2>
        )}
        totalPages={totalPages}
      />
    </CardContent>
  </Card>
)

TableList.propTypes = {
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    date_created: isMomentPropValidation,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    })),
    paid_amount: PropTypes.number.isRequired,
    status: PropTypes.oneOf([
      'paid', 'available', 'inactive',
    ]).isRequired,
    url: PropTypes.string.isRequired,
  })),
  disabled: PropTypes.bool,
  exporting: PropTypes.bool.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onExport: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onUrlCopy: PropTypes.func.isRequired,
  order: PropTypes.oneOf([
    'ascending', 'descending',
  ]),
  orderField: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  t: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
}

TableList.defaultProps = {
  data: [],
  disabled: false,
  loading: false,
  order: 'ascending',
  orderField: 0,
}

export default TableList
