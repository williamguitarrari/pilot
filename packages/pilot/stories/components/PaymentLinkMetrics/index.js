import React, { Component } from 'react'
import {
  assoc,
  identity,
} from 'ramda'
import {
  action,
} from '@storybook/addon-actions'

import Section from '../../Section'
import PaymentLinkMetrics from '../../../src/containers/PaymentLinks/Metrics'
import {
  presets,
  totalAmountByWeekday,
} from './mocks'

const dateConfirmAction = action('onDateConfirm')
const loadingAction = action('onLoadingChange')

class PaymentLinkMetricsExample extends Component {
  constructor() {
    super()
    this.state = {
      loading: {
        metrics: false,
      }
    }
  }

  toggleLoading (callback) {
    const {
      loading,
      loading: {
        metrics,
      },
    } = this.state
    loadingAction('loading', !metrics)

    this.setState({
      loading: assoc(['metrics'], !metrics, loading),
    }, callback)
  }

  handleToggleLoading () {
    this.toggleLoading(() => {
      setTimeout(() => {
        this.toggleLoading()
      }, 1000)
    })
  }

  handleOnDateConfirm = (dates, preset) => {

    dateConfirmAction(dates, preset)
    this.handleToggleLoading(() => {
      setTimeout(() => {
        this.handleToggleLoading()
      }, 1000)
    })
  }

  render() {
    const { loading } = this.state
    return (
      <Section>
        <PaymentLinkMetrics
          localLoading={loading}
          onDateConfirm={this.handleOnDateConfirm}
          presets={presets}
          t={identity}
          totalAmountByWeekday={totalAmountByWeekday}
          totalAmountLinksPaid={1070000}
          totalLinksPaid={40}
        />
      </Section>
    )
  }
}

export default PaymentLinkMetricsExample
