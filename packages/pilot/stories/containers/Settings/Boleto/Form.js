import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import BoletoConfigurationForm from '../../../../src/containers/Settings/Boleto/Form'

class BoletoForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      daysToAddInExpirationDate: '2',
      instructions: 'accept',
    }

    this.onCancel = this.onCancel.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onCancel () {
    this.setState({
      daysToAddInExpirationDate: '2',
      instructions: 'accept',
    }, () => action('Cancel')(this.state))
  }

  onSubmit ({ instructions, daysToAddInExpirationDate }, errors) {
    if (!errors) {
      this.setState({
        daysToAddInExpirationDate,
        instructions,
      }, () => action('Submit')(this.state))
    }
  }

  render () {
    const {
      daysToAddInExpirationDate,
      instructions,
    } = this.state

    return (
      <BoletoConfigurationForm
        daysToAddInExpirationDate={daysToAddInExpirationDate}
        instructions={instructions}
        instructionsOptions={[
          {
            name: 'settings.boleto.instructions.accept',
            value: 'accept',
          },
          {
            name: 'settings.boleto.instructions.refuse',
            value: 'refuse',
          },
        ]}
        onCancel={this.onCancel}
        onSubmit={this.onSubmit}
        t={translate => translate}
      />
    )
  }
}

export default BoletoForm
