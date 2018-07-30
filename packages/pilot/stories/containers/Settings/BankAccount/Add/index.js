import React, { Component } from 'react'
import { action } from '@storybook/addon-actions'
import {
  last,
  merge,
  pipe,
  split,
} from 'ramda'

import BankAccountForm from '../../../../../src/containers/Settings/BankAccount/Add'

const defaultErrorData = {
  account: '',
  accountCd: '',
  agency: '',
  agencyCd: '',
  bankCode: '',
  type: '',
}

class BankAccountFormExample extends Component {
  constructor () {
    super()

    this.state = {
      actionsDisabled: true,
      data: {
        account: '',
        accountCd: '',
        agency: '',
        agencyCd: '',
        bankCode: '',
        documentNumber: '26268738888',
        legalName: 'API BANK ACCOUNT',
        type: '',
      },
      errors: defaultErrorData,
    }

    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCancel () {
    this.setState({
      actionsDisabled: true,
      data: {
        account: '',
        accountCd: '',
        agency: '',
        agencyCd: '',
        bankCode: '',
        documentNumber: '26268738888',
        legalName: 'API BANK ACCOUNT',
        type: '',
      },
      errors: defaultErrorData,
    }, () => action('Cancel')(this.state))
  }

  handleChange (data, errors) {
    const { data: stateData } = this.state

    this.setState(({
      actionsDisabled: false,
      data: merge(stateData, data),
      errors,
    }), () => action('Change')(this.state))
  }

  handleSubmit (data, errors) {
    const { data: stateData } = this.state

    if (!errors) {
      this.setState({
        actionsDisabled: true,
        data: merge(stateData, data),
        errors: defaultErrorData,
      }, () => action('Submit')(this.state.data))
    }
  }

  render () {
    const {
      actionsDisabled,
      data,
      errors,
    } = this.state

    return (
      <BankAccountForm
        actionsDisabled={actionsDisabled}
        data={data}
        errors={errors}
        onChange={this.handleChange}
        onCancel={this.handleCancel}
        onSubmit={this.handleSubmit}
        t={pipe(split('.'), last)}
      />
    )
  }
}

export default BankAccountFormExample
