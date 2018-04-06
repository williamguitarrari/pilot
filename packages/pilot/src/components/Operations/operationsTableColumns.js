import React from 'react'
import {
  any,
  equals,
  isNil,
  map,
  propSatisfies,
} from 'ramda'
import classNames from 'classnames'
import IconAnticipation from 'emblematic-icons/svg/ArrowUp24.svg'
import currencyFormatter from '../../formatters/currency'
import style from './style.css'
import dateFormatter from '../../../src/formatters/longDate'

const isPayable = equals('payable')

const getValueClass = (value) => {
  if (value > 0) {
    return style.positive
  } else if (value < 0) {
    return style.negative
  }

  return style.zero
}

const getValueOperator = (value) => {
  if (value > 0) {
    return (
      <span className={classNames(style.operator, style.positive)}>
        +
      </span>
    )
  } else if (value < 0) {
    return (
      <span className={classNames(style.operator, style.negative)}>
        -
      </span>
    )
  }

  return null
}

const getTypeLabel = (type, labels) => {
  if (!isNil(type) && !isPayable(type)) {
    return labels[type]
  }

  return null
}

const isNotAnticipation = propSatisfies(isNil, 'original')

// eslint-disable-next-line react/prop-types
const renderDescription = ({ description, type }, labels) => (
  <div className={style.descriptionColumn}>
    <div className={style.type}>
      {getTypeLabel(type, labels)}
    </div>
    {!isNil(description)
      && <div> {description} </div>
    }
  </div>
)

const renderNet = net => ( // eslint-disable-line react/prop-types
  <span className={classNames(style.net, getValueClass(net))}>
    {getValueOperator(net)}
    {currencyFormatter(net < 0 ? -(net) : net)}
  </span>
)

// eslint-disable-next-line react/prop-types
const renderOperationAmount = (labels, isNegative) => ({ amount, type }) => {
  const outAmount = currencyFormatter(amount)
  const outType = getTypeLabel(type, labels)
  return (
    <div
      key={`${amount}_${type}`}
      className={style.outAmount}
    >
      {outType
        && <span>({ outType })</span>
      }
      {getValueOperator(isNegative ? (-amount) : amount)}
      <span>
        {outAmount}
      </span>
    </div>
  )
}

const isInvalidAmount = ({ amount }) => isNil(amount) || isNaN(amount) // eslint-disable-line

const hasInvalidAmount = any(isInvalidAmount)

const renderOperationAmounts = (amounts, labels, isNegative) => {
  if (hasInvalidAmount(amounts)) {
    return null
  }

  return map(renderOperationAmount(labels, isNegative), amounts)
}

const renderOutcoming = (amounts, labels) => renderOperationAmounts(amounts, labels)

const renderOutgoing = (amounts, labels) => renderOperationAmounts(amounts, labels, true)

const renderPaymentDate = (paymentDate) => { // eslint-disable-line react/prop-types, camelcase
  if (isNotAnticipation(paymentDate)) {
    return dateFormatter(paymentDate.actual)
  }
  return (
    <div className={style.paymentColumn}>
      <div>
        <div className={style.anticipationDate}>
          {dateFormatter(paymentDate.actual)}
        </div>
        <div>{dateFormatter(paymentDate.original)}</div>
      </div>
      <span className={style.anticipationIcon}>
        <IconAnticipation />
      </span>
    </div>
  )
}

const getColumns = labels => ([
  {
    accessor: ['payment_date', 'actual'],
    align: 'center',
    orderable: false,
    title: 'operation.payment_date',
    // eslint-disable-next-line camelcase
    renderer: ({ payment_date }) => renderPaymentDate(payment_date),
  },
  {
    accessor: ['id'],
    align: 'center',
    orderable: false,
    title: 'operation.id',
  },
  {
    accessor: ['type'],
    align: 'start',
    orderable: false,
    title: 'operation.description',
    renderer: operation => renderDescription(operation, labels),
  },
  {
    accessor: ['outcoming', 'amount'],
    align: 'end',
    orderable: false,
    title: 'operation.outcoming',
    renderer: ({ outcoming }) => renderOutcoming(outcoming, labels),
  },
  {
    accessor: ['outgoing', 'amount'],
    align: 'end',
    orderable: false,
    title: 'operation.outgoing',
    renderer: ({ outgoing }) => renderOutgoing(outgoing, labels),
  },
  {
    accessor: ['net'],
    align: 'end',
    orderable: false,
    title: 'operation.net',
    renderer: ({ net }) => renderNet(net),
  },
])


export default getColumns
