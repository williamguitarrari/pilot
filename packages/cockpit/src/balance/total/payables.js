import {
  applySpec,
  flatten,
  juxt,
  map,
  negate,
  pathOr,
  pipe,
  pluck,
  prop,
  sum,
} from 'ramda'

const juxtSum = (functions = []) => pipe(
  juxt(functions),
  sum
)

const applyFunctionsToArray = functions => map(juxt(functions))

const buildDaysSumFunction = functions => pipe(
  applyFunctionsToArray(functions),
  flatten,
  sum
)

const getSumFromFunction = sumFunction => juxtSum([
  sumFunction('boleto'),
  sumFunction('credit_card'),
  sumFunction('debit_card'),
])

const getCreditAmount = property => pathOr(0, [property, 'credit', 'amount'])

const getChargeBackFeeFrom = property =>
  pathOr(0, [property, 'chargeback', 'anticipation_fee'])

const getCreditFeeFrom = property => pathOr(0, [property, 'credit', 'fee'])

const getRefundFraudCoverageFeeFrom = property => pipe(
  pathOr(0, [property, 'refund', 'fraud_coverage_fee']),
  Math.abs
)

const getChargebackAmountFrom = property => pipe(
  pathOr(0, [property, 'chargeback', 'amount']),
  Math.abs
)

const getRefundAmountFrom = property => pipe(
  pathOr(0, [property, 'refund', 'amount']),
  Math.abs
)

const sumFee = property => juxtSum([
  getChargeBackFeeFrom(property),
  getCreditFeeFrom(property),
  getRefundFraudCoverageFeeFrom(property),
])

const sumChargebackAndRefund = property => juxtSum([
  getChargebackAmountFrom(property),
  getRefundAmountFrom(property),
])

const getOutcoming = getSumFromFunction(getCreditAmount)

const getOutgoing = pipe(
  juxtSum([
    getSumFromFunction(sumFee),
    getSumFromFunction(sumChargebackAndRefund),
  ]),
  negate
)

const getNetAmount = property => pipe(
  prop(property),
  juxtSum([
    getOutcoming,
    getOutgoing,
  ])
)

const applySumFunctionToProp = (property, getFunction) => pipe(
  prop(property),
  getFunction
)

const sumWaitingFundsNet = getNetAmount('waiting_funds')

const sumWaitingFundsOutcoming = applySumFunctionToProp(
  'waiting_funds',
  getOutcoming
)

const sumWaitingFundsOutgoing = applySumFunctionToProp(
  'waiting_funds',
  getOutgoing
)

const sumPrepaidFundsNet = getNetAmount('prepaid')

const sumPrepaidOutcoming = applySumFunctionToProp(
  'prepaid',
  getOutcoming
)

const sumPrepaidOutgoing = applySumFunctionToProp(
  'prepaid',
  getOutgoing
)

const sumNetAmount = buildDaysSumFunction([
  sumPrepaidFundsNet,
  sumWaitingFundsNet,
])

const sumOutcoming = buildDaysSumFunction([
  sumPrepaidOutcoming,
  sumWaitingFundsOutcoming,
])

const sumOutgoing = buildDaysSumFunction([
  sumPrepaidOutgoing,
  sumWaitingFundsOutgoing,
])

const getDates = pluck('date')

const buildPayablesTotal = applySpec({
  net: sumNetAmount,
  outcoming: sumOutcoming,
  outgoing: sumOutgoing,
  dates: getDates,
})

export default buildPayablesTotal
