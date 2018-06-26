import React from 'react'
import PropTypes from 'prop-types'
import { mapObjIndexed } from 'ramda'
import {
  Col,
  Grid,
  Row,
} from 'former-kit'

import Property from '../Property'

const fields = (labels, contents) => mapObjIndexed((label, key) => (
  <Property
    title={label}
    value={contents[key]}
  />
), labels)

const ReprocessDetails = ({
  contents,
  labels,
}) => {
  const {
    amount,
    cardNumber,
    holderName,
    installments,
  } = fields(labels, contents)

  return (
    <Grid>
      <Row>
        <Col palm={12} tablet={4} desk={4} tv={4}>
          { cardNumber }
        </Col>
        <Col palm={12} tablet={4} desk={4} tv={4}>
          {amount}
        </Col>
        <Col palm={12} tablet={4} desk={4} tv={4}>
          {installments}
        </Col>
        <Col palm={12} tablet={12} desk={12} tv={12}>
          {holderName}
        </Col>
      </Row>
    </Grid>
  )
}

const shape = {
  amount: PropTypes.string.isRequired,
  cardNumber: PropTypes.string.isRequired,
  holderName: PropTypes.string.isRequired,
  installments: PropTypes.string.isRequired,
}

ReprocessDetails.propTypes = {
  contents: PropTypes.shape(shape).isRequired,
  labels: PropTypes.shape(shape).isRequired,
}

export default ReprocessDetails
