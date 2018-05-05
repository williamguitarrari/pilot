import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import DataDisplay from '../DataDisplay'
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

const renderValue = (amount, color) => {
  const formattedValue = decimalCurrency(Math.abs(amount))

  return (
    <div className={style.amount}>
      <small style={{ color }}>
        {renderSymbol(amount)}
      </small>
      {
        formattedValue === 'NaN'
          ? <div className={style.empty} />
          : <h3>{formattedValue}</h3>
      }
    </div>
  )
}

const renderTitle = (color, unit, title) => (
  <Fragment>
    <h2 style={{ color }}>{title}</h2>
    <span>({unit})</span>
  </Fragment>
)

const TotalDisplay = ({
  title,
  amount,
  color,
  subtitle,
  unit,
}) => (
  <DataDisplay
    title={renderTitle(color, unit, title)}
    color={color}
    subtitle={subtitle}
  >
    {renderValue(amount, color)}
  </DataDisplay>
)

TotalDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  unit: PropTypes.string,
  subtitle: PropTypes.node,
}

TotalDisplay.defaultProps = {
  subtitle: null,
  unit: '',
}

export default TotalDisplay
