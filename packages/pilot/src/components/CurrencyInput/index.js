import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  pipe,
  replace,
} from 'ramda'

import currencyFormatter from '../../formatters/currency'

const removeNonDigits = replace(/\D+/g, '')

const formatter = pipe(
  removeNonDigits,
  currencyFormatter
)

const normalize = pipe(
  removeNonDigits,
  Number
)

class CurrencyInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: formatter(props.value, props.currencyCode),
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const { value } = event.target
    const { currencyCode } = this.props
    const formattedValue = formatter(value, currencyCode)
    const normalizedValue = normalize(value)

    this.setState({
      value: formattedValue,
    })

    if (this.props.onChange) {
      this.props.onChange(event, normalizedValue, formattedValue)
    }
  }

  render () {
    const {
      value,
    } = this.state

    return (
      <input
        {...this.props}
        onChange={this.handleChange}
        value={value}
      />
    )
  }
}

CurrencyInput.propTypes = {
  currencyCode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

CurrencyInput.defaultProps = {
  currencyCode: 'BRL',
}

export default CurrencyInput
