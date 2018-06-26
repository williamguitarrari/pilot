import React from 'react'
import PropTypes from 'prop-types'
import {
  CardSection,
  Col,
  Row,
} from 'former-kit'

import TotalDisplay from '../../../components/TotalDisplay'
import DataDisplay from '../../../components/DataDisplay'
import style from './style.css'

const Summary = ({
  colors,
  contents,
  labels,
  unit,
}) => (
  <Row stretch>
    <Col
      desk={3}
      palm={3}
      tablet={3}
      tv={3}
    >
      <CardSection>
        <div className={style.content}>
          <DataDisplay
            title={labels.date}
            value={contents.date}
          />
        </div>
      </CardSection>
    </Col>
    <Col
      palm={3}
      desk={3}
      tablet={3}
      tv={3}
    >
      <CardSection>
        <div className={style.content}>
          <TotalDisplay
            amount={contents.requested}
            color={colors.requested}
            title={labels.requested}
            unit={unit}
          />
        </div>
      </CardSection>
    </Col>
    <Col
      desk={3}
      palm={3}
      tablet={3}
      tv={3}
    >
      <CardSection>
        <div className={style.content}>
          <TotalDisplay
            amount={contents.transferCost}
            color={colors.transferCost}
            title={labels.transferCost}
            unit={unit}
          />
        </div>
      </CardSection>
    </Col>
    <Col
      desk={3}
      palm={3}
      tablet={3}
      tv={3}
    >
      <CardSection>
        <div className={style.content}>
          <TotalDisplay
            amount={contents.amount}
            color={colors.amount}
            title={labels.amount}
            unit={unit}
          />
        </div>
      </CardSection>
    </Col>
  </Row>
)

Summary.propTypes = {
  colors: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    requested: PropTypes.string.isRequired,
    transferCost: PropTypes.string.isRequired,
  }).isRequired,
  contents: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    requested: PropTypes.number.isRequired,
    transferCost: PropTypes.number.isRequired,
  }).isRequired,
  labels: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    requested: PropTypes.string.isRequired,
    transferCost: PropTypes.string.isRequired,
  }).isRequired,
  unit: PropTypes.string.isRequired,
}

export default Summary
