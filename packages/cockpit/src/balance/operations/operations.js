import {
  __,
  always,
  allPass,
  both,
  cond,
  either,
  ifElse,
  includes,
  juxt,
  of as ofRamda,
  pathEq,
  pathOr,
  pathSatisfies,
  pipe,
  prop,
  propEq,
  reject,
} from 'ramda'

import {
  isNegative,
  transformMovementTypePropTo,
  transformAndNegateMovementTypePropTo,
  formatRows,
} from './shared'

const compareMovementTypeTo = type => pathEq(['movement_object', 'type'], type)

export const isChargebackRefund = both(
  propEq('type', 'payable'),
  compareMovementTypeTo('chargeback_refund')
)

export const isRefundOrChargeBack = pathSatisfies(
  includes(__, ['chargeback', 'refund']),
  ['movement_object', 'type']
)

export const isRefundReversal = both(
  propEq('type', 'payable'),
  compareMovementTypeTo('refund_reversal')
)

export const refundOrChargeBackOutcoming = juxt([
  transformAndNegateMovementTypePropTo(['fee'], 'mdr'),
])

export const refundOrChargeBackOutgoing = juxt([
  transformMovementTypePropTo(['amount'], 'payable'),
])

export const isTedTransfer = both(
  propEq('type', 'transfer'),
  compareMovementTypeTo('ted')
)

export const isCreditTransfer = both(
  propEq('type', 'transfer'),
  compareMovementTypeTo('credito_em_conta')
)

export const zeroMovementAmount = always({
  amount: 0,
  type: 'payable',
})

export const tedTransferOutgoing = juxt([
  transformAndNegateMovementTypePropTo(['fee'], 'tedFee'),
  transformMovementTypePropTo(['amount'], 'payable'),
])

export const creditTransferOutgoing = juxt([
  transformMovementTypePropTo(['amount'], 'payable'),
])

export const isInterRecipientTransfer = both(
  propEq('type', 'transfer'),
  compareMovementTypeTo('inter_recipient')
)

export const interRecipientTransferOutcoming = juxt([
  ifElse(
    isNegative('amount'),
    zeroMovementAmount,
    transformMovementTypePropTo(['amount'], 'payable')
  ),
])

export const interRecipientTransferOutgoing = juxt([
  ifElse(
    isNegative('amount'),
    transformMovementTypePropTo(['amount'], 'payable'),
    zeroMovementAmount
  ),
])

export const isBoletoRefund = both(
  propEq('type', 'refund'),
  compareMovementTypeTo('boleto')
)

export const boletoRefundFeeOutgoing = juxt([
  transformAndNegateMovementTypePropTo(['fee'], 'tedFee'),
])

export const boletoRefundFeeOutcoming = juxt([
  transformMovementTypePropTo(['amount'], 'payable'),
])

export const isCredit = both(
  propEq('type', 'payable'),
  compareMovementTypeTo('credit')
)

export const creditOutcoming = juxt([
  transformMovementTypePropTo(['movement_object', 'amount'], 'payable'),
])

export const creditOutgoing = pipe(
  juxt([
    transformAndNegateMovementTypePropTo(['movement_object', 'fee'], 'mdr'),
    transformAndNegateMovementTypePropTo(
      ['movement_object', 'anticipation_fee'],
      'anticipation_fee'
    ),
    transformAndNegateMovementTypePropTo(
      ['movement_object', 'fraud_coverage_fee'],
      'fraud_coverage_fee'
    ),
  ]),
  reject(propEq('amount', 0))
)

export const isGatewayFeeCollection = allPass([
  propEq('type', 'fee_collection'),
  pipe(
    prop('movement_object'),
    compareMovementTypeTo('gateway')
  ),
])

export const gatewayFeeCollectionOutgoing = juxt([
  transformMovementTypePropTo(['movement_object', 'amount'], 'gateway'),
])

export const isAdjustmentFeeCollection = both(
  propEq('type', 'fee_collection'),
  compareMovementTypeTo('fee_adjustment')
)

export const adjustmentFeeCollectionOutgoing = juxt([
  ifElse(
    isNegative('amount'),
    transformMovementTypePropTo(['amount'], 'fee_adjustment'),
    zeroMovementAmount
  ),
])

export const adjustmentFeeCollectionOutcoming = juxt([
  ifElse(
    isNegative('amount'),
    zeroMovementAmount,
    transformMovementTypePropTo(['amount'], 'fee_adjustment')
  ),
])

export const buildOutcoming = cond([
  [
    isRefundOrChargeBack,
    refundOrChargeBackOutcoming,
  ],
  [
    isRefundReversal,
    creditOutcoming,
  ],
  [
    either(isTedTransfer, isCreditTransfer),
    pipe(
      zeroMovementAmount,
      ofRamda
    ),
  ],
  [
    isInterRecipientTransfer,
    interRecipientTransferOutcoming,
  ],
  [
    isBoletoRefund,
    boletoRefundFeeOutcoming,
  ],
  [
    isCredit,
    creditOutcoming,
  ],
  [
    isGatewayFeeCollection,
    pipe(
      zeroMovementAmount,
      ofRamda
    ),
  ],
  [
    isAdjustmentFeeCollection,
    adjustmentFeeCollectionOutcoming,
  ],
  [
    isChargebackRefund,
    creditOutcoming,
  ],
])

export const buildOutgoing = cond([
  [
    isRefundOrChargeBack,
    refundOrChargeBackOutgoing,
  ],
  [
    isRefundReversal,
    pipe(
      zeroMovementAmount,
      ofRamda
    ),
  ],
  [
    isTedTransfer,
    tedTransferOutgoing,
  ],
  [
    isCreditTransfer,
    creditTransferOutgoing,
  ],
  [
    isInterRecipientTransfer,
    interRecipientTransferOutgoing,
  ],
  [
    isBoletoRefund,
    boletoRefundFeeOutgoing,
  ],
  [
    isCredit,
    creditOutgoing,
  ],
  [
    isGatewayFeeCollection,
    gatewayFeeCollectionOutgoing,
  ],
  [
    isAdjustmentFeeCollection,
    adjustmentFeeCollectionOutgoing,
  ],
  [
    isChargebackRefund,
    creditOutgoing,
  ],
])

export const getInstallment = ifElse(
  pathEq(['movement_object', 'payment_method'], 'boleto'),
  always(null),
  pathOr(null, ['movement_object', 'installment'])
)

export default formatRows({
  buildOutcoming,
  buildOutgoing,
  getInstallment,
})
