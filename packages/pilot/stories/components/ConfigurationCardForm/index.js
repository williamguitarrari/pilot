import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { action } from '@storybook/addon-actions'
import {
  FormDropdown,
  Spacing,
} from 'former-kit'
import IconBarcode from 'emblematic-icons/svg/BarCode32.svg'
import ConfigurationCardForm from '../../../src/components/ConfigurationCardForm'

import style from './style.css'

const initialDataState = {
  installments: '2',
  instructions: 'What',
}

const collapsedAction = action('collapsed')
const cancelAction = action('cancel')
const confirmAction = action('confirm')

class ConfigurationCardFormExample extends Component {
  constructor () {
    super()

    this.state = {
      collapsed: false,
      data: initialDataState,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.toggleCollapse = this.toggleCollapse.bind(this)
  }

  handleSubmit (data, error) {
    if (!error) {
      this.setState({ data })
    }

    confirmAction(this.state.data)
  }

  handleCancel () {
    this.setState({
      data: initialDataState,
    }, () => cancelAction(this.state.data))
  }

  toggleCollapse () {
    const { collapsed } = this.state
    this.setState({
      collapsed: !collapsed,
    }, () => collapsedAction(this.state.collapsed))
  }

  render () {
    const {
      collapsed,
      data: {
        installments,
        instructions,
      },
    } = this.state

    const { t } = this.props

    return (
      <ConfigurationCardForm
        title={t('configurations.boleto.title')}
        subtitle={t('configurations.boleto.subtitle')}
        data={{
          installments,
          instructions,
        }}
        onCancel={this.handleCancel}
        onClick={this.toggleCollapse}
        onSubmit={this.handleSubmit}
        collapsed={collapsed}
        icon={<IconBarcode width={16} height={16} />}
        t={translate => translate}
      >
        <p>{t('configurations.boleto.description')}</p>

        <div className={style.content}>
          <FormDropdown
            label={t('configurations.boleto.installments_title')}
            name="installments"
            options={[
              { name: '1', value: '1' },
              { name: '2', value: '2' },
            ]}
          />
          <Spacing size="small" />
          <FormDropdown
            label={t('configurations.boleto.instructions_title')}
            name="instructions"
            options={[
              { name: 'What', value: 'What' },
              { name: 'is', value: 'is' },
              { name: 'this?', value: 'this?' },
            ]}
          />
        </div>
      </ConfigurationCardForm>
    )
  }
}

ConfigurationCardFormExample.propTypes = {
  t: PropTypes.func,
}

ConfigurationCardFormExample.defaultProps = {
  t: t => t,
}

export default ConfigurationCardFormExample
