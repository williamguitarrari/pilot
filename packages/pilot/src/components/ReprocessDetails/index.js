import React from 'react'
import PropTypes from 'prop-types'
import { mapObjIndexed } from 'ramda'
import {
  CardSection,
  Col,
  Grid,
  Row,
} from 'former-kit'

import styles from './style.css'
import Property from '../Property'

const fields = (labels, contents) => mapObjIndexed((label, key) => (
  <Property
    className={styles.property}
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
    holderName,
    transactionId,
  } = fields(labels, contents)

  return (
    <div className={styles.reprocessDetails}>
      <CardSection>
        <Grid>
          <Row stretch>
            <Col align="start" palm={3} tablet={3} desk={3} tv={3}>
              <b>{transactionId}</b>
            </Col>
            <Col align="center" palm={6} tablet={6} desk={6} tv={6}>
              {holderName}
            </Col>
            <Col align="end" palm={3} tablet={3} desk={3} tv={3}>
              <b>{amount}</b>
            </Col>
          </Row>
        </Grid>
      </CardSection>
    </div>
  )
}

ReprocessDetails.propTypes = {
  contents: PropTypes.shape({
    amount: PropTypes.node.isRequired,
    holderName: PropTypes.node.isRequired,
    transactionId: PropTypes.node.isRequired,
  }).isRequired,
  labels: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    holderName: PropTypes.string.isRequired,
    transactionId: PropTypes.string.isRequired,
  }).isRequired,
}

export default ReprocessDetails
