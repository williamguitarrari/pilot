import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  Flexbox,
  Input,
  Pagination,
  SegmentedSwitch,
  Spacing,
} from 'former-kit'

import IconSearch from 'emblematic-icons/svg/Search24.svg'

import CustomerForm from './CustomerForm'
import CustomerSelection from './CustomerSelection'

import style from './style.css'

const createOptions = t => ([
  { title: t('add_transaction_new_customer'), value: 'addition' },
  { title: t('add_transaction_select_customer'), value: 'selection' },
])

class Customers extends Component {
  constructor () {
    super()

    this.state = {
      search: '',
      view: 'addition',
    }

    this.onChangeView = this.onChangeView.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
  }

  onChangeView (view) {
    this.setState({
      view,
    })
  }

  onChangeSearch ({ target }) {
    this.setState({
      search: target.value,
    })
  }

  render () {
    const {
      actionsDisabled,
      currentPage,
      customers,
      onCancel,
      onContinue,
      onPageChange,
      onSearch,
      onSelectCustomer,
      selected,
      t,
      totalPages,
    } = this.props

    const { search, view } = this.state

    const viewSelectCustomer = view === 'selection'

    return (
      <Card>
        <CardContent>
          <Flexbox className={style.toolbar}>
            <SegmentedSwitch
              name="view"
              onChange={this.onChangeView}
              options={createOptions(t)}
              size="tiny"
              value={view}
            />

            {viewSelectCustomer &&
              <Fragment>
                <Spacing />

                <Input
                  icon={<IconSearch width={12} height={12} />}
                  onChange={this.onChangeSearch}
                  placeholder={t('add_transaction_search_customer')}
                  size="tiny"
                  value={search}
                />
                <Spacing size="tiny" />
                <Button
                  fill="outline"
                  size="tiny"
                  onClick={() => onSearch(search)}
                >
                  {t('search')}
                </Button>

                <Spacing size="small" />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  size="tiny"
                  strings={{
                    of: t('of'),
                  }}
                />
              </Fragment>
            }
          </Flexbox>
        </CardContent>

        {viewSelectCustomer
          ? (
            <CustomerSelection
              actionDisabled={actionsDisabled}
              customers={customers}
              onCancel={onCancel}
              onSelect={onSelectCustomer}
              onSubmit={onContinue}
              selected={selected}
              t={t}
            />
          ) : (
            <CustomerForm
              onCancel={onCancel}
              onSubmit={onContinue}
              t={t}
            />
          )
        }
      </Card>
    )
  }
}

const customerShape = PropTypes.shape({
  document: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['corporation', 'individual']).isRequired,
})

Customers.propTypes = {
  actionsDisabled: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  customers: PropTypes.arrayOf(customerShape).isRequired,
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
  selected: customerShape,
  t: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
}

Customers.defaultProps = {
  selected: null,
}

export default Customers
