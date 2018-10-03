import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import CustomersContainer from '../../../../src/containers/CreateTransaction/Customers'
import Section from '../../../Section'

const customersMock = [
  {
    id: 1,
    name: 'Caio Leandro Drumond',
    email: 'caioleandrodrumond-78@saa.com.br',
    document: '82196391808',
    phone: '11999936784',
    type: 'individual',
    country: 'br',
  },
  {
    id: 2,
    name: 'Mirella Natália Nascimento',
    email: 'mirellanatalianascimento@callan.com.br',
    document: '22083175808',
    phone: '1137205576',
    type: 'individual',
    country: 'br',
  },
  {
    id: 3,
    name: 'Fábio Ian Nogueira',
    email: 'fbn@vectrausinagem.com.br',
    document: '44629832890',
    phone: '11983196429',
    type: 'individual',
    country: 'br',
  },
]

const actionCustomer = action('customer')
const actionCustomerSelect = action('selected')
const actionPageChange = action('page change')
class Customers extends Component {
  constructor () {
    super()

    this.state = {
      disabled: true,
      customer: null,
      pagination: {
        current: 1,
        total: 5,
      },
    }

    this.handleContinue = this.handleContinue.bind(this)
    this.handleSelectCustomer = this.handleSelectCustomer.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handleContinue (data) {
    this.setState({
      customer: data || this.state.customer,
    }, () => actionCustomer(this.state.customer))
  }

  handleSelectCustomer (customer) {
    this.setState({
      disabled: false,
      customer,
    }, () => actionCustomerSelect(this.state.customer))
  }

  handlePageChange (page) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        current: page,
      },
    }, () => actionPageChange(this.state.pagination.current))
  }

  render () {
    const {
      disabled,
      customer,
      pagination,
    } = this.state

    return (
      <Section>
        <CustomersContainer
          actionsDisabled={disabled}
          currentPage={pagination.current}
          customers={customersMock}
          onCancel={action('cancel')}
          onContinue={this.handleContinue}
          onPageChange={this.handlePageChange}
          onSearch={action('search')}
          onSelectCustomer={this.handleSelectCustomer}
          selected={customer}
          t={t => t}
          totalPages={pagination.total}
        />
      </Section>
    )
  }
}

export default Customers
