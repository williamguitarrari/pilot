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

class CurrencyInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: formatter(props.value),
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const { value } = event.target
    const formattedValue = formatter(value)
    const normalizedValue = removeNonDigits(value)

    this.setState({
      value: formattedValue,
    })

    if (this.props.onChange) {
      this.props.onChange(normalizedValue, formattedValue)
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
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default CurrencyInput
