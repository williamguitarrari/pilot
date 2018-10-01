import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'

import Section from '../../Section'
import CustomerSelection from '../../../src/components/CustomerSelection'

const actionSelection = action('selection')

const customers = [
  {
    id: 1,
    name: 'Jhon Doe',
    document: '42863917013',
    email: 'jhondoe@email.com',
    phone: '+5544912345678',
  },
  {
    id: 2,
    name: 'Jhonny Doe',
    document: '69099567022',
    email: 'jhonny.doe@email.com',
    phone: '+554432641234',
  },
]

class CustomerSelectionExample extends Component {
  constructor () {
    super()

    this.state = {
      disabled: false,
      selected: {
        id: 1,
        name: 'Jhon Doe',
        document: '42863917013',
        email: 'jhondoe@email.com',
        phone: '+5544912345678',
      },
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect (customer) {
    this.setState({
      selected: customer,
      disabled: true,
    }, () => {
      this.setState({ disabled: false })
      actionSelection(this.state.selected)
    })
  }

  render () {
    const {
      disabled,
      selected,
    } = this.state

    return (
      <Section>
        <Card>
          <CustomerSelection
            actionDisabled={disabled}
            customers={customers}
            onCancel={action('cancel')}
            onSelect={this.handleSelect}
            onSubmit={action('submit')}
            selected={selected}
            t={t => t}
          />
        </Card>
      </Section>
    )
  }
}

export default CustomerSelectionExample
