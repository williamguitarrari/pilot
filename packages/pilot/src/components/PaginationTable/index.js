import React, {
  Fragment,
  PureComponent,
} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Download32 from 'emblematic-icons/svg/Download32.svg'
import {
  CardTitle,
  Dropdown,
  Flexbox,
  Pagination,
  Spacing,
} from 'former-kit'

import ExportData from '../ExportData'
import TableData from './TableData'
import style from './style.css'

const getExportOptions = onExport => ([
  {
    action: () => onExport('csv'),
    title: 'CSV',
  },
  {
    action: () => onExport('xlsx'),
    title: 'Excel',
  },
])

class PaginationTable extends PureComponent {
  constructor (props) {
    super(props)

    this.renderSubTitle = this.renderSubTitle.bind(this)
  }

  renderSubTitle () {
    const {
      currentPage,
      disabled,
      exporting,
      itemsPerPage,
      labels: {
        exportCall,
        exportTo,
        totalOf,
      },
      onExport,
      onPageChange,
      onPageCountChange,
      pageSizeOptions,
      paginationFormat,
      subtitle,
      totalPages,
    } = this.props

    return (
      <div className={style.subtitle}>
        { onExport
          && (
            <Fragment>
              <ExportData
                exportOptions={getExportOptions(onExport)}
                icon={<Download32 width={12} height={12} />}
                loading={exporting}
                placement="bottomEnd"
                fill="outline"
                size="tiny"
                subtitle={exportTo}
                title={exportCall}
              />
              <Spacing size="tiny" />
            </Fragment>
          )
        }
        <Dropdown
          disabled={disabled}
          name="page-count"
          onChange={e => onPageCountChange(parseInt(e.target.value, 10))}
          options={pageSizeOptions}
          size="tiny"
          value={itemsPerPage.toString()}
        />
        <Spacing size="tiny" />
        <Pagination
          currentPage={currentPage}
          disabled={disabled}
          format={paginationFormat}
          onPageChange={onPageChange}
          strings={{
            of: totalOf,
          }}
          totalPages={totalPages}
        />
        {subtitle}
      </div>
    )
  }

  render () {
    const {
      className,
      columns,
      currentPage,
      disabled,
      labels: {
        empty,
        totalOf,
      },
      loading,
      onOrderChange,
      onPageChange,
      onRowClick,
      order,
      orderField,
      paginationFormat,
      rows,
      title,
      totalPages,
    } = this.props

    return (
      <div className={classNames(style.container, className)}>
        <div className={style.head}>
          <CardTitle
            subtitle={this.renderSubTitle()}
            title={title}
          />
        </div>
        <TableData
          columns={columns}
          disabled={disabled}
          emptyMessage={empty}
          loading={loading}
          onOrderChange={onOrderChange}
          onRowClick={onRowClick}
          order={order}
          orderField={orderField}
          rows={rows}
        />
        <Flexbox justifyContent="flex-end">
          <Pagination
            currentPage={currentPage}
            disabled={disabled}
            format={paginationFormat}
            onPageChange={onPageChange}
            strings={{
              of: totalOf,
            }}
            totalPages={totalPages}
          />
        </Flexbox>
      </div>
    )
  }
}

PaginationTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.arrayOf(PropTypes.string).isRequired,
    orderable: PropTypes.bool.isRequired,
    renderer: PropTypes.func,
    title: PropTypes.string.isRequired,
  })).isRequired,
  currentPage: PropTypes.number.isRequired,
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
  onOrderChange: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  order: PropTypes.oneOf([
    'ascending', 'descending',
  ]),
  orderField: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  paginationFormat: PropTypes.oneOf([
    'single', 'range',
  ]),
  rows: PropTypes.arrayOf(PropTypes.object),
  subtitle: PropTypes.node,
  title: PropTypes.node,
  totalPages: PropTypes.number.isRequired,
}

PaginationTable.defaultProps = {
  className: null,
  disabled: false,
  loading: false,
  onExport: null,
  onOrderChange: null,
  onRowClick: null,
  order: 'ascending',
  orderField: 0,
  paginationFormat: 'single',
  rows: [],
  subtitle: null,
  title: null,
}

export default PaginationTable
