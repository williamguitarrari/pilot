import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  func,
  number,
  object,
  string,
  shape,
} from 'prop-types'

import {
  Button,
  Dropdown,
  Pagination,

  Table,
  CardContent,
} from 'former-kit'

// import IconAdd from 'emblematic-icons/svg/AddBox24.svg'
// import IconReverse from 'emblematic-icons/svg/Reverse24.svg'
// import IconReprocess from 'emblematic-icons/svg/Reprocess24.svg'

import style from './style.css'

const buttons = [
  // {
  //   text: 'Adicionar',
  //   icon: <IconAdd width="12px" height="12px" />,
  // },
  // {
  //   text: 'Estornar',
  //   icon: <IconReverse width="12px" height="12px" />,
  // },
  // {
  //   text: 'Reprocessar',
  //   icon: <IconReprocess width="12px" height="12px" />,
  // },
]

const renderPlaceholder = (selectedPage, label) => {
  if (selectedPage) {
    return `${selectedPage.toString()} ${label}`
  }

  return 'Items per page'
}

class TableContainer extends Component {
  constructor (props) {
    super(props)

    this.handlePageCountChange = this.handlePageCountChange.bind(this)
  }

  handlePageCountChange (event) {
    const { value } = event.target
    this.props.handlePageCountChange(value)
  }

  render () {
    const {
      columns,
      expandable,
      handleOrderChange,
      handlePageChange,
      handleRowClick,
      itemsPerPageLabel,
      loading,
      maxColumns,
      ofLabel,
      order,
      orderColumn,
      pagination,
      rows,
      selectable,
      selectedPage,
      expandedRows,
      handleExpandRow,
      handleSelectRow,
      selectedRows,
    } = this.props

    return (
      <React.Fragment>
        <CardContent className={style.tableHeader}>
          <div>
            {
              buttons.map(button => (
                <Button
                  key={button.text}
                  relevance="low"
                  fill="outline"
                  icon={button.icon}
                  disabled={loading}
                >
                  {button.text}
                </Button>
              ))
            }
          </div>

          <div className={style.dropdown}>
            <Dropdown
              options={[15, 30, 60, 100].map(i =>
                ({ name: `${i} ${itemsPerPageLabel}`, value: `${i}` }))
              }
              name="count"
              value={selectedPage.toString()}
              placeholder={renderPlaceholder(selectedPage, itemsPerPageLabel)}
              onChange={this.handlePageCountChange}
              disabled={loading}
            />
            <Pagination
              currentPage={pagination.offset}
              totalPages={pagination.total}
              onPageChange={handlePageChange}
              disabled={loading}
              strings={{
                of: ofLabel,
              }}
            />
          </div>
        </CardContent>

        <Table
          className={style.table}
          columns={columns}
          disabled={loading}
          expandable={expandable}
          expandedRows={expandedRows}
          handleRowClick={handleRowClick}
          maxColumns={maxColumns}
          onExpandRow={handleExpandRow}
          onOrderChange={handleOrderChange}
          onSelectRow={handleSelectRow}
          orderColumn={orderColumn}
          orderSequence={order}
          rows={rows}
          selectable={selectable}
          selectedRows={selectedRows}
        />

        <CardContent className={style.pagination}>
          <Pagination
            currentPage={pagination.offset}
            totalPages={pagination.total}
            onPageChange={handlePageChange}
            disabled={loading}
            strings={{
              of: ofLabel,
            }}
          />
        </CardContent>
      </React.Fragment>
    )
  }
}

TableContainer.propTypes = {
  columns: arrayOf(object), // eslint-disable-line
  expandable: bool,
  handleOrderChange: func.isRequired, // eslint-disable-line
  handlePageChange: func.isRequired, // eslint-disable-line
  handlePageCountChange: func.isRequired, // eslint-disable-line
  handleRowClick: func,
  loading: bool,
  maxColumns: number,
  order: string,
  orderColumn: number,
  pagination: shape({
    offset: number,
    total: number,
  }).isRequired,
  rows: arrayOf(object), // eslint-disable-line
  selectable: bool,
  selectedPage: number,
  itemsPerPageLabel: string.isRequired, // eslint-disable-line react/no-typos
  ofLabel: string.isRequired, // eslint-disable-line react/no-typos
  expandedRows: arrayOf(number).isRequired,
  selectedRows: arrayOf(number).isRequired,
  handleSelectRow: func.isRequired, // eslint-disable-line react/no-typos
  handleExpandRow: func.isRequired, // eslint-disable-line react/no-typos
}

TableContainer.defaultProps = {
  columns: [],
  expandable: false,
  handleRowClick: () => undefined,
  loading: false,
  maxColumns: 7,
  order: 'ascending',
  orderColumn: 0,
  rows: [],
  selectable: false,
  selectedPage: 15,
}

export default TableContainer
