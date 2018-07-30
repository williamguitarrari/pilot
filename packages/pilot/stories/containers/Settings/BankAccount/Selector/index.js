import React, { Component } from 'react'

import BankAccountSelector from '../../../../../src/containers/Settings/BankAccount/Selector'

class BankAccountSelectorExample extends Component {
  constructor () {
    super()

    this.state = {
      selectedAccountId: 1,
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect (id) {
    this.setState({
      selectedAccountId: id,
    })
  }

  render () {
    return (
      <BankAccountSelector
        accounts={[
          {
            agencia_dv: '0',
            agencia: '378-3',
            bank_code: '341',
            conta_dv: '9',
            conta: '69885',
            id: 1,
            legal_name: 'Conta Principal',
            type: 'Conta corrente',
          },
          {
            agencia_dv: '0',
            agencia: '378-3',
            bank_code: '341',
            conta_dv: '9',
            conta: '69885',
            id: 2,
            legal_name: 'Conta Secundária',
            type: 'Conta corrente',
          },
        ]}
        onSelect={this.handleSelect}
        selectedAccountId={this.state.selectedAccountId}
        t={t => t}
      />
    )
  }
}

export default BankAccountSelectorExample
