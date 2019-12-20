import React from 'react'
import PropTypes from 'prop-types'
import {
  __,
  pipe,
  juxt,
  prop,
  always,
  pathOr,
} from 'ramda'
import moment from 'moment-timezone'
import transactionOperationTypes from '../../../models/transactionOperationTypes'

import Event from '../../../components/Event'
import EventDetails from '../EventDetails'

const getOperationLegendStatus = pipe(
  juxt([
    prop('type'),
    always('status'),
    prop('status'),
  ]),
  pathOr({}, __, transactionOperationTypes)
)

const Events = ({
  boleto,
  color,
  id,
  operations,
  payment,
  riskLevel,
  t,
}) => (
  operations.map((operation, index) => {
    const {
      cycle,
      status,
      type,
    } = operation
    const key = `${type}_${status}_${(cycle || 0)}_${index}`
    const legendStatus = getOperationLegendStatus(operation)
    const number = operations.length - index

    return (
      <Event
        active={index === 0}
        color={color}
        isMoreThanOneOperation={operations.length > 1}
        key={key}
        number={number}
        title={legendStatus.title}
      >
        <EventDetails
          boleto={boleto}
          id={id}
          legendStatus={legendStatus}
          operation={operation}
          payment={payment}
          riskLevel={riskLevel}
          t={t}
        />
      </Event>
    )
  })
)

Events.propTypes = {
  boleto: PropTypes.shape({
    barcode: PropTypes.string,
    due_date: PropTypes.instanceOf(moment),
    url: PropTypes.string,
  }),
  color: PropTypes.string.isRequired,
  id: PropTypes.number,
  operations: PropTypes.arrayOf(PropTypes.shape({
    cycle: PropTypes.number,
    status: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  payment: PropTypes.shape({
    authorized_amount: PropTypes.number,
    paid_amount: PropTypes.number,
  }).isRequired,
  riskLevel: PropTypes.string,
  t: PropTypes.func.isRequired,
}

Events.defaultProps = {
  boleto: null,
  id: null,
  riskLevel: 'unknown',
}

export default Events
