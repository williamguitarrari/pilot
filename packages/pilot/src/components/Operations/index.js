import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Card,
  CardContent,
  CardGraphic,
  CardSection,
  CardSectionTitle,
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
      subtitle,
    } = this.props

    return (
      <div className={style.subtitle}>
        <small>{subtitle}</small>
      </div>
    )
  }

  render () {
    const {
      columns,
      loading,
      offset,
      ofLabel,
      onOrderChange,
      onPageChange,
      order,
      orderColumnIndex,
      rows,
      title,
      totalPages,
    } = this.props
    return (
      <Card>
        <CardSection>
          <CardSectionTitle
            title={title}
            subtitle={this.renderSubTitle()}
          />
          <CardContent className={style.pagination}>
            <Pagination
              currentPage={offset}
              disabled={loading}
              onPageChange={onPageChange}
              strings={{
                of: ofLabel,
              }}
              totalPages={totalPages}
            />
          </CardContent>
          <CardGraphic>
            <Table
              columns={columns}
              disabled={loading}
              onOrderChange={onOrderChange}
              orderColumn={orderColumnIndex}
              orderSequence={order}
              rows={rows}
            />
          </CardGraphic>
          <CardContent className={classNames(style.paginationBottom, style.pagination)}>
            <Pagination
              currentPage={offset}
              disabled={loading}
              onPageChange={onPageChange}
              strings={{
                of: ofLabel,
              }}
              totalPages={totalPages}
            />
          </CardContent>
        </CardSection>
      </Card>
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
  loading: PropTypes.bool,
  offset: PropTypes.number.isRequired,
  ofLabel: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderColumnIndex: PropTypes.number,
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
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
}

Operations.defaultProps = {
  loading: false,
  order: 'ascending',
  orderColumnIndex: null,
}

export default Operations
