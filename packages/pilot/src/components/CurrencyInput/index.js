import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  pipe,
  replace,
  omit,
} from 'ramda'

import decimalCurrency from '../../formatters/decimalCurrency'

const removeNonDigits = replace(/\D+/g, '')

const formatter = pipe(
  removeNonDigits,
  decimalCurrency
)

const notAllowedProps = [
  'inputRef',
  'multiline',
]

class CurrencyInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: {
        formatted: formatter(props.value),
        normalized: removeNonDigits(props.value),
      },
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    const { formatted, normalized } = this.state.value

    if (prevState.value.normalized !== normalized) {
      prevProps.onChange(normalized, formatted)
    }
  }

  handleChange ({ target }) {
    const { max } = this.props
    const formatted = formatter(target.value)
    const normalized = removeNonDigits(target.value)

    if (!max || (max && normalized <= max)) {
      this.setState({
        value: {
          formatted,
          normalized,
        },
      })
    }
  }

  render () {
    const {
      value,
    } = this.state

    return (
      <input
        {...omit(notAllowedProps, this.props)}
        onChange={this.handleChange}
        value={value.formatted}
      />
    )
  }
}

CurrencyInput.propTypes = {
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

CurrencyInput.defaultProps = {
  max: null,
}

export default CurrencyInput
