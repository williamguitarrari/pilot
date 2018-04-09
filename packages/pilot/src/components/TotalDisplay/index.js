import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
} from 'former-kit'

import decimalCurrency from '../../formatters/decimalCurrency'
import style from './style.css'

const renderSymbol = (value) => {
  if (value < 0) {
    return '-'
  }

  if (value > 0) {
    return '+'
  }

  return null
}

const renderValue = (amount, color) => (
  <div className={style.amount}>
    <small style={{ color }}>
      {renderSymbol(amount)}
    </small>
    <h3>{ decimalCurrency(amount < 0 ? -amount : amount) }</h3>
  </div>
)

const TotalDisplay = ({
  title,
  amount,
  color,
  subtitle,
  unity,
}) => (
  <Card>
    <CardContent className={style.content}>
      <div className={style.title}>
        <h2 style={{ color }}>{title}</h2>
        <span>({unity})</span>
      </div>

      { renderValue(amount, color) }

      <div className={style.subtitle}>
        {subtitle}
      </div>
    </CardContent>
  </Card>
)

TotalDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  unity: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
}

TotalDisplay.defaultProps = {
  subtitle: null,
}

export default TotalDisplay
