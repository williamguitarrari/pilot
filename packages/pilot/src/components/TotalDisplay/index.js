import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
} from 'former-kit'

import currencyFormatter from '../../formatters/currency'
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

      <div className={style.amount}>
        <small style={{ color }}>
          {renderSymbol(amount)}
        </small>
        <h3>{currencyFormatter(amount).replace('R$', '').replace('-', '')}</h3>
      </div>

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
