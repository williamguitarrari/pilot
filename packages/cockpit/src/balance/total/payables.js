import {
  applySpec,
  juxt,
  map,
  negate,
  pathOr,
  pipe,
  pluck,
  sum,
  when,
  gt,
  lt,
  always,
  __,
} from 'ramda'

import paths from './payableCashPaths'

const sumFunctionResults = (functions = []) => pipe(
  juxt(functions),
  sum
)

const getPositveOrZero = propPath => pipe(
  pathOr(0, propPath),
  when(
    lt(__, 0),
    always(0)
  )
)

const getNegativeOrZero = propPath => pipe(
  pathOr(0, propPath),
  when(
    gt(__, 0),
    always(0)
  )
)

const negateFunction = func => pipe(
  func,
  negate
)

const getCashInFee = feePath => negateFunction(getNegativeOrZero(feePath))

const getCashOutFee = feePath => negateFunction(getPositveOrZero(feePath))

const getCashOutFrom = propertyPath => sumFunctionResults([
  getNegativeOrZero([...propertyPath, 'amount']),
])

const getCashInFrom = propertyPath => sumFunctionResults([
  getPositveOrZero([...propertyPath, 'amount']),
  getCashInFee([...propertyPath, 'anticipation_fee']),
  getCashInFee([...propertyPath, 'fee']),
  getCashInFee([...propertyPath, 'fraud_coverage_fee']),
])

const getFeeFrom = propertyPath => sumFunctionResults([
  getCashOutFee([...propertyPath, 'anticipation_fee']),
  getCashOutFee([...propertyPath, 'fee']),
  getCashOutFee([...propertyPath, 'fraud_coverage_fee']),
])

const cashInFunctions = map(getCashInFrom, paths)

const cashOutFunctions = map(getCashOutFrom, paths)

const feeFunctions = map(getFeeFrom, paths)

const mapSumFunction = sumFunction => pipe(
  map(sumFunctionResults(sumFunction)),
  sum
)

const sumFee = mapSumFunction(feeFunctions)

const sumOutcoming = mapSumFunction(cashInFunctions)

const sumOutgoing = mapSumFunction(cashOutFunctions)

const sumNetAmount = sumFunctionResults([
  sumOutcoming,
  sumOutgoing,
])

const getDates = pluck('date')

const buildPayablesTotal = applySpec({
  fee: sumFee,
  net: sumNetAmount,
  outcoming: sumOutcoming,
  outgoing: sumOutgoing,
  dates: getDates,
})

export default buildPayablesTotal
