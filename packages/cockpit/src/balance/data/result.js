import {
  __,
  always,
  apply,
  applySpec,
  assoc,
  both,
  cond,
  either,
  head,
  includes,
  ifElse,
  isEmpty,
  isNil,
  join,
  juxt,
  last,
  lt,
  map,
  of as ofRamda,
  path,
  pathEq,
  pathOr,
  pathSatisfies,
  pipe,
  pluck,
  prop,
  propEq,
  propSatisfies,
  subtract,
  sum,
  when,
  T,
} from 'ramda'
import { buildPendingRequest } from '../../bulkAnticipations'

const getWithDv = propName => pipe(
  juxt([
    path(['bank_account', propName]),
    path(['bank_account', `${propName}_dv`]),
  ]),
  ifElse(
    pipe(last, isNil),
    head,
    join('-')
  )
)

const buildRecipient = pipe(
  prop('recipient'),
  applySpec({
    id: prop('id'),
    name: path(['bank_account', 'legal_name']),
    bank_account: {
      account: getWithDv('conta'),
      agency: getWithDv('agencia'),
      bank_code: path(['bank_account', 'bank_code']),
      id: path(['bank_account', 'id']),
      type: path(['bank_account', 'type']),
    },
  })
)

const buildBalance = applySpec({
  amount: path(['balance', 'available', 'amount']),
  available: {
    withdrawal: path(['withdrawal', 'maximum']),
  },
  outcoming: path(['balance', 'waiting_funds', 'amount']),
})

const buildRequests = pipe(
  prop('bulk_anticipations_pending'),
  buildPendingRequest
)

const isInvalidOperationDate = type => pipe(
  prop(type),
  isNil
)

const getOperationDate = (dateType, fallbackDateType) => pipe(
  prop('movement_object'),
  ifElse(
    isInvalidOperationDate(dateType),
    prop(fallbackDateType),
    prop(dateType)
  ),
  when(
    either(isNil, isEmpty),
    always(null)
  )
)

const transformMovementTypePropTo = (propPath, to) => pipe(
  path(propPath),
  when(either(isNil, isEmpty), always(0)),
  Math.abs,
  assoc('amount', __, { type: to })
)

const isRefundOrChargeBack = pathSatisfies(
  includes(__, ['chargeback', 'refund']),
  ['movement_object', 'type']
)

const refundOrChargeBackOutcoming = juxt([
  transformMovementTypePropTo(['fee'], 'mdr'),
])

const refundOrChargeBackOutgoing = juxt([
  transformMovementTypePropTo(['amount'], 'payable'),
])

const isTedTransfer = both(
  propEq('type', 'transfer'),
  pathEq(['movement_object', 'type'], 'ted')
)

const zeroTransferAmount = always({
  amount: 0,
  type: 'payable',
})

const tedTransferOutgoing = juxt([
  transformMovementTypePropTo(['fee'], 'tedFee'),
  transformMovementTypePropTo(['amount'], 'payable'),
])

const isInterRecipientTransfer = both(
  propEq('type', 'transfer'),
  pathEq(['movement_object', 'type'], 'inter_recipient')
)

const lessThanZero = lt(__, 0)
const isNegative = propSatisfies(lessThanZero)

const interRecipientTransferOutcoming = juxt([
  ifElse(
    isNegative('amount'),
    zeroTransferAmount,
    transformMovementTypePropTo(['amount'], 'payable')
  ),
])

const interRecipientTransferOutgoing = juxt([
  ifElse(
    isNegative('amount'),
    transformMovementTypePropTo(['amount'], 'payable'),
    zeroTransferAmount
  ),
])

const isBoletoRefundFee = both(
  propEq('type', 'refund'),
  pathEq(['movement_object', 'type'], 'boleto')
)

const boletoRefundFeeOutgoing = juxt([
  transformMovementTypePropTo(['fee'], 'tedFee'),
])

const boletoRefundFeeOutcoming = juxt([
  transformMovementTypePropTo(['amount'], 'payable'),
])

const isCredit = both(
  propEq('type', 'payable'),
  pathEq(['movement_object', 'type'], 'credit')
)

const creditOutcoming = juxt([
  transformMovementTypePropTo(['movement_object', 'amount'], 'payable'),
])

const creditOutgoing = juxt([
  transformMovementTypePropTo(['movement_object', 'fee'], 'mdr'),
  transformMovementTypePropTo(
    ['movement_object', 'anticipation_fee'],
    'anticipation_fee'
  ),
])

const buildOperationOutcoming = cond([
  [
    isRefundOrChargeBack,
    refundOrChargeBackOutcoming,
  ],
  [
    isTedTransfer,
    pipe(
      zeroTransferAmount,
      ofRamda
    ),
  ],
  [
    isInterRecipientTransfer,
    interRecipientTransferOutcoming,
  ],
  [
    isBoletoRefundFee,
    boletoRefundFeeOutcoming,
  ],
  [
    isCredit,
    creditOutcoming,
  ],
])

const buildOperationOutgoing = cond([
  [
    isRefundOrChargeBack,
    refundOrChargeBackOutgoing,
  ],
  [
    isTedTransfer,
    tedTransferOutgoing,
  ],
  [
    isInterRecipientTransfer,
    interRecipientTransferOutgoing,
  ],
  [
    isBoletoRefundFee,
    boletoRefundFeeOutgoing,
  ],
  [
    isCredit,
    creditOutgoing,
  ],
])

const getType = cond([
  [
    both(
      propEq('type', 'refund'),
      pathEq(['movement_object', 'type'], 'boleto')
    ),
    always('boletoRefundFee'),
  ],
  [
    pathEq(['movement_object', 'type'], 'credit'),
    path(['movement_object', 'payment_method']),
  ],
  [T, path(['movement_object', 'type'])],
])

const getInstallment = ifElse(
  pathEq(['movement_object', 'payment_method'], 'boleto'),
  always(null),
  pathOr(null, ['movement_object', 'installment'])
)

const getSourceId = ifElse(
  pathEq(['movement_object', 'type'], 'inter_recipient'),
  path(['movement_object', 'source_id']),
  always(null)
)

const getTarget = ifElse(
  pathEq(['movement_object', 'type'], 'inter_recipient'),
  path(['movement_object', 'target_id']),
  always(null)
)

const buildOperationsRows = pipe(
  prop('operations'),
  map(applySpec({
    id: prop('id'),
    installment: getInstallment,
    net: pipe(
      juxt([
        pipe(buildOperationOutcoming, pluck('amount'), sum),
        pipe(buildOperationOutgoing, pluck('amount'), sum),
      ]),
      apply(subtract)
    ),
    outcoming: buildOperationOutcoming,
    outgoing: buildOperationOutgoing,
    payment_date: {
      actual: getOperationDate('payment_date', 'date_created'),
      original: getOperationDate('original_payment_date'),
    },
    sourceId: getSourceId,
    targetId: getTarget,
    type: getType,
    transactionId: pathOr(null, ['movement_object', 'transaction_id']),
  }))
)

const buildOperationsCount = query => (result) => {
  if (query.count > result.operations.length) {
    return query.page
  }

  return 100
}

const buildOperationsTotal = query => (result) => {
  if (query.count > result.operations.length) {
    return result.operations.length
  }

  return 1000
}

const buildResult = query => applySpec({
  query: always(query),
  result: {
    balance: buildBalance,
    recipient: buildRecipient,
    requests: buildRequests,
    search: {
      operations: {
        count: buildOperationsCount(query),
        offset: always(0),
        rows: buildOperationsRows,
        total: buildOperationsTotal(query),
      },
    },
  },
})

export default buildResult
