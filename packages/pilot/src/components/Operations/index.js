import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  CardContent,
  CardTitle,
  Pagination,
  Table,
} from 'former-kit'

import style from './style.css'

class Operations extends PureComponent {
  constructor (props) {
    super(props)

    this.renderSubTitle = this.renderSubTitle.bind(this)
  }

  renderSubTitle () {
    const {
      currentPage,
      disabled,
      ofLabel,
      onPageChange,
      subtitle,
      totalPages,
    } = this.props

    return (
      <div className={style.subtitle}>
        <h3>{subtitle}</h3>
        <Pagination
          currentPage={currentPage}
          disabled={disabled}
          onPageChange={onPageChange}
          strings={{
            of: ofLabel,
          }}
          totalPages={totalPages}
        />
      </div>
    )
  }

  render () {
    const {
      columns,
      currentPage,
      emptyMessage,
      disabled,
      ofLabel,
      onPageChange,
      rows,
      title,
      totalPages,
    } = this.props

    return (
      <div className={style.container}>
        <div className={style.head}>
          <CardTitle
            subtitle={this.renderSubTitle()}
            title={title}
          />
        </div>
        <CardContent>
          <Table
            columns={columns}
            disabled={disabled}
            emptyMessage={emptyMessage}
            maxColumns={6}
            rows={rows}
          />
        </CardContent>
        <CardContent className={classNames(style.paginationBottom, style.pagination)}>
          <Pagination
            currentPage={currentPage}
            disabled={disabled}
            onPageChange={onPageChange}
            strings={{
              of: ofLabel,
            }}
            totalPages={totalPages}
          />
        </CardContent>
      </div>
    )
  }
}

const outShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
})

Operations.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.arrayOf(PropTypes.string).isRequired,
    orderable: PropTypes.bool.isRequired,
    renderer: PropTypes.func,
    title: PropTypes.string.isRequired,
  })).isRequired,
  currentPage: PropTypes.number.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  ofLabel: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
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
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
}

Operations.defaultProps = {
  disabled: false,
}

export default Operations
