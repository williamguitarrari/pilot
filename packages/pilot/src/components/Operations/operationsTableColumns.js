import React from 'react'
import {
  all,
  allPass,
  always,
  any,
  either,
  equals,
  gt,
  head,
  isNil,
  map,
  pipe,
  prop,
  propEq,
  propSatisfies,
  lt,
  when,
  __,
} from 'ramda'
import classNames from 'classnames'
import {
  Flexbox,
  Spacing,
  Tooltip,
  Truncate,
} from 'former-kit'
import IconAnticipation from 'emblematic-icons/svg/Undo24.svg'
import HelpInfo from 'emblematic-icons/svg/Help32.svg'

import currencyFormatter from '../../formatters/currency'
import style from './style.css'
import dateFormatter from '../../formatters/longDate'

const isPayable = equals('payable')

const getValueClass = (value) => {
  if (value > 0) {
    return style.positive
  }
  if (value < 0) {
    return style.negative
  }

  return style.zero
}

const renderValueAndOperator = (value) => {
  if (value > 0) {
    return (
      <span className={classNames(style.operator, style.positive)}>
        +
      </span>
    )
  }
  if (value < 0) {
    return (
      <span className={classNames(style.operator, style.negative)}>
        -
      </span>
    )
  }

  return null
}

const getTypeLabel = (type, labels) => {
  if (type === 'refund_reversal') {
    return (
      <Flexbox>
        {labels[type]}
        <Spacing size="tiny" />
        <Tooltip
          content={labels.refund_reversal_description}
          placement="rightMiddle"
        >
          <HelpInfo
            height={16}
            width={16}
          />
        </Tooltip>
      </Flexbox>
    )
  }

  if (!isNil(type) && !isPayable(type)) {
    return labels[type]
  }

  return null
}

const isNotAnticipation = propSatisfies(isNil, 'original')

const isTransferSource = lt(__, 0)

const renderTargetOrSource = (type, net, targetId, sourceId, labels) => {
  if (type === 'inter_recipient' && isTransferSource(net)) {
    return (<div>{`${labels.to} ${targetId}`}</div>)
  }

  if (type === 'inter_recipient' && !isTransferSource(net)) {
    return (<div>{`${labels.from} ${sourceId}`}</div>)
  }

  return null
}

const greaterThanZero = gt(__, 0)

const isFailedTransfer = allPass([
  either(
    propEq('type', 'credito_em_conta'),
    propEq('type', 'transfer')
  ),
  propEq('status', 'failed'),
  pipe(
    prop('amount'),
    greaterThanZero
  ),
])

const getOutgoingAmount = pipe(
  head,
  prop('amount')
)

const renderCreditTransferStatus = (
  type,
  status,
  outgoing,
  transferId,
  labels
) => {
  const amount = getOutgoingAmount(outgoing)
  const hasFailed = isFailedTransfer({ amount, status, type })

  if (hasFailed) {
    return (
      <span>{`${labels.failed} ${transferId}`}</span>
    )
  }

  if (type === 'credito_em_conta' || type === 'transfer') {
    return (
      <span>{`${labels.transferId} ${transferId}`}</span>
    )
  }

  return null
}

const renderFeeCollection = (type, description) => {
  if (type === 'fee_collection' && description) {
    return (
      <Truncate text={description} />
    )
  }

  return null
}

/* eslint-disable react/prop-types */
const renderDescription = ({
  description,
  installment,
  net,
  outgoing,
  sourceId,
  status,
  targetId,
  transferId,
  type,
}, labels) => {
  const amount = getOutgoingAmount(outgoing)

  return (
    <div className={style.descriptionColumn}>
      {!isFailedTransfer({ amount, status, type })
        && (
          <div className={style.type}>{getTypeLabel(type, labels)}</div>
        )
      }
      {!isNil(installment)
        && (
          <div>{`${labels.installment} ${installment}`}</div>
        )
      }
      {renderCreditTransferStatus(type, status, outgoing, transferId, labels)}
      {renderTargetOrSource(type, net, targetId, sourceId, labels)}
      {renderFeeCollection(type, description)}
    </div>
  )
}
/* eslint-enable react/prop-types */

const getAbsoluteValue = Math.abs

const renderNet = net => ( // eslint-disable-line react/prop-types
  <span className={classNames(style.net, getValueClass(net))}>
    {renderValueAndOperator(net)}
    {currencyFormatter(getAbsoluteValue(net))}
  </span>
)

// eslint-disable-next-line react/prop-types
const renderOperationAmount = labels => ({ amount, type }) => {
  if (!amount) {
    return null
  }

  const absoluteAmount = getAbsoluteValue(amount)
  const formattedAmount = currencyFormatter(absoluteAmount)
  const outType = getTypeLabel(type, labels)
  return (
    <div key={`${amount}_${type}`}>
      {outType && <span>({ outType })</span>}
      {renderValueAndOperator(amount)}
      <span>
        {formattedAmount}
      </span>
    </div>
  )
}

const isInvalidAmount = pipe(prop('amount'), either(isNil, Number.isNaN))

const hasInvalidAmount = any(isInvalidAmount)

const buildOperationsAmount = when(
  all(isNil),
  always(null)
)

const renderOperationAmounts = (amounts, labels) => {
  if (hasInvalidAmount(amounts)) {
    return null
  }

  const operationAmounts = map(
    renderOperationAmount(labels),
    amounts
  )

  return buildOperationsAmount(operationAmounts)
}

const renderPaymentDate = (paymentDate, toolTipText) => {
  if (isNotAnticipation(paymentDate)) {
    return dateFormatter(paymentDate.actual)
  }
  return (
    <Tooltip
      className={style.tooltip}
      content={toolTipText}
      placement="rightMiddle"
    >
      <div className={style.payment}>
        <div>
          <div className={style.anticipationDate}>
            {dateFormatter(paymentDate.actual)}
          </div>
          <div>{dateFormatter(paymentDate.original)}</div>
        </div>
        <span className={style.anticipationIcon}>
          <IconAnticipation width={12} height={12} />
        </span>
      </div>
    </Tooltip>
  )
}

const getColumns = labels => ([
  {
    accessor: ['paymentDate', 'actual'],
    align: 'center',
    orderable: false,
    renderer: ({
      paymentDate,
    }) => renderPaymentDate(paymentDate, labels.anticipationMessage),
    title: 'models.operations.payment_date',
  },
  {
    accessor: ['id'],
    align: 'center',
    orderable: false,
    title: 'models.operations.id',
  },
  {
    accessor: ['transactionId'],
    align: 'center',
    orderable: false,
    title: 'models.operations.transaction_id',
  },
  {
    accessor: ['type'],
    align: 'start',
    orderable: false,
    renderer: operation => renderDescription(operation, labels),
    title: 'models.operations.description',
  },
  {
    accessor: ['outcoming', 'amount'],
    align: 'end',
    orderable: false,
    renderer: ({ outcoming }) => renderOperationAmounts(outcoming, labels),
    title: 'models.operations.outcoming',
  },
  {
    accessor: ['outgoing', 'amount'],
    align: 'end',
    orderable: false,
    renderer: ({ outgoing }) => renderOperationAmounts(outgoing, labels),
    title: 'models.operations.outgoing',
  },
  {
    accessor: ['net'],
    align: 'end',
    orderable: false,
    renderer: ({ net }) => renderNet(net),
    title: 'models.operations.net',
  },
])

export default getColumns
