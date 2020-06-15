import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'ramda'
import { translate } from 'react-i18next'
import PaymentLinksContainer from '../../containers/PaymentLinks'

const enhanced = compose(
  translate()
)

const PaymentLinks = ({
  t,
}) => {
  const onAddPaymentLink = () => {}

  return (
    <PaymentLinksContainer
      onAddPaymentLink={onAddPaymentLink}
      t={t}
    />
  )
}

PaymentLinks.propTypes = {
  t: PropTypes.func.isRequired,
}

export default enhanced(PaymentLinks)

