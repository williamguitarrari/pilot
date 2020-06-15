import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
} from 'former-kit'
import NewLinksCard from './NewLinksCard'

const PaymentLinks = ({
  onAddPaymentLink,
  t,
}) => (
  <Grid>
    <Row>
      <NewLinksCard onAddPaymentLink={onAddPaymentLink} t={t} />
    </Row>
  </Grid>
)

PaymentLinks.propTypes = {
  onAddPaymentLink: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default PaymentLinks
