import React from 'react'
import PropTypes from 'prop-types'

import Download32 from 'emblematic-icons/svg/Download32.svg'

import {
  findIndex,
  propEq,
} from 'ramda'

import {
  Card,
  CardActions,
  CardContent,
  CardTitle,
  Dropdown,
  Pagination,
} from 'former-kit'

import style from './style.css'

import ExportData from '../../../components/ExportData'
import TableList from '../../../components/TableList'

import tableColumns from './tableColumns'

import itemsPerPage from '../../../models/itemsPerPage'

const getExportOptions = onExport => ([
  {
    action: () => onExport('csv'),
    title: 'CSV',
  },
  {
    action: () => onExport('xls'),
    title: 'Excel',
  },
])

const PaymentLinksList = ({
  exporting,
  loading,
  onExport,
  onOrderChange,
  onPageChange,
  onPageCountChange,
  onRowClick,
  order,
  orderField,
  pageCount,
  pagination,
  rows,
  selectedPage,
  t,
}) => {
  const columns = tableColumns({ t })
  const orderColumn = findIndex(propEq('accessor', [orderField]), columns)
  const handleOrderChange = (
    columnIndex,
    tableOrder
  ) => onOrderChange(columns[columnIndex].accessor, tableOrder)

  const paginationElem = (
    <Pagination
      currentPage={selectedPage}
      disabled={loading}
      onPageChange={onPageChange}
      size="tiny"
      strings={{
        of: t('components.pagination.of'),
      }}
      totalPages={pagination.total}
    />
  )

  return (loading || rows.length > 0)
            && (
              <Card>
                <CardTitle
                  title={(
                    <h2 className={style.customTitle}>
                      {t('pages.payment_links.list.title')}
                    </h2>
                  )}
                  subtitle={(
                    <div className={style.toolBar}>
                      <>
                        <ExportData
                          exportOptions={getExportOptions(onExport)}
                          icon={<Download32 width={12} height={12} />}
                          loading={exporting}
                          placement="bottomEnd"
                          relevance="low"
                          size="tiny"
                          subtitle={t('export_to')}
                          title={t('export_table')}
                        />
                        <Dropdown
                          disabled={loading}
                          name="page-count"
                          onChange={({ target: { value } }) => (
                            onPageCountChange(parseInt(value, 10))
                          )}
                          options={itemsPerPage.map(i => ({
                            name: t('items_per_page', { count: i }),
                            value: `${i}`,
                          }))}
                          size="tiny"
                          value={pageCount.toString()}
                        />
                        {paginationElem}
                      </>
                    </div>
                  )}
                />

                <CardContent>
                  <TableList
                    columns={columns}
                    disabled={loading}
                    loading={loading}
                    maxColumns={6}
                    onOrderChange={handleOrderChange}
                    onRowClick={onRowClick}
                    orderColumn={orderColumn}
                    orderSequence={order}
                    rows={rows}
                  />
                </CardContent>

                <CardActions>
                  {paginationElem}
                </CardActions>
              </Card>
            )
}

PaymentLinksList.propTypes = {
  exporting: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onExport: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderField: PropTypes.string,
  pageCount: PropTypes.number.isRequired,
  pagination: PropTypes.shape({
    offset: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPage: PropTypes.number,
  t: PropTypes.func.isRequired,
}

PaymentLinksList.defaultProps = {
  order: 'descending',
  orderField: '',
  selectedPage: 1,
}

export default PaymentLinksList
