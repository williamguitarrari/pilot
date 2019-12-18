import React from 'react'
import PropTypes from 'prop-types'

import PaymentCard from '../../../components/PaymentCard'

/* eslint-disable camelcase */
const RenderPaymentCard = ({
  card,
  paymentCardLabels,
}) => {
  const {
    brand_name,
    first_digits,
    holder_name,
    last_digits,
  } = card

  return (
    <PaymentCard
      title={paymentCardLabels.title}
      first={first_digits}
      last={last_digits}
      holderName={holder_name}
      brand={brand_name}
    />
  )
}
/* eslint-enable camelcase */

RenderPaymentCard.propTypes = {
  card: PropTypes.shape({
    brand_name: PropTypes.string,
    first_digits: PropTypes.string,
    holder_name: PropTypes.string,
    last_digits: PropTypes.string,
  }).isRequired,
  paymentCardLabels: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
}

export default RenderPaymentCard
