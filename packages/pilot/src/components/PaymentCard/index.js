import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardContent,
} from 'former-kit'

import IconChip from './IconChip.svg'
import CardBrand from '../../formatters/cardBrand'
import cardNumberFormatter from '../../formatters/cardNumber'

import style from './style.css'

const PaymentCard = ({
  first,
  last,
  holderName,
  brand,
  title,
}) => (
  <Card className={style.card}>
    <CardContent className={style.cardContent}>
      <div className={style.cardTitle}>
        <h2>{title}</h2>
      </div>
      <div className={style.cardNumber}>
        <IconChip className={style.cardChip} />
        <strong>
          { cardNumberFormatter(first) } { last }
        </strong>
      </div>
      <div className={style.cardBrandHolder}>
        <p>{ holderName }</p>
        { CardBrand(brand) }
      </div>
    </CardContent>
  </Card>
)

PaymentCard.propTypes = {
  title: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  holderName: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
}

export default PaymentCard

