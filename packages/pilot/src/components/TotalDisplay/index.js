import React from 'react'
import PropTypes from 'prop-types'
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
  amount,
  color,
  subtitle,
  unit,
  title,
}) => (
  <div className={style.content}>
    <div className={style.title}>
      <h2 style={{ color }}>{title}</h2>
      <span>({unit})</span>
    </div>

    { renderValue(amount, color) }

    {subtitle &&
      <div className={style.subtitle}>
        {subtitle}
      </div>
    }
  </div>
)

TotalDisplay.propTypes = {
  amount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  unit: PropTypes.string,
  subtitle: PropTypes.node,
  title: PropTypes.string.isRequired,
}

TotalDisplay.defaultProps = {
  subtitle: null,
  unit: '',
}

export default TotalDisplay
