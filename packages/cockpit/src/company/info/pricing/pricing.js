import {
  applySpec,
  always,
  curry,
  isNil,
  juxt,
  length,
  pathOr,
  pick,
  pipe,
  propOr,
  reduce,
  reject,
  unless,
} from 'ramda'

const getPriceFromProp = (propName, formatter) => pipe(
  propOr(null, propName),
  unless(isNil, formatter)
)
const createRealPrice = value => ({
  unit: 'real',
  value,
})
const createPercentagePrice = value => ({
  unit: 'percentage',
  value,
})

const getPriceEntry = (title, getPrice) => pricingObj => ({
  title,
  prices: reject(
    isNil,
    [getPrice(pricingObj)]
  ),
})

const createMainItem = mainTitle => subItems => ({
  mainTitle,
  subItems,
})

const getTransactionPath = curry((basePath, path, obj) => pathOr('', [basePath, path], obj))
const getTransactionSpreadPath = getTransactionPath('transaction_spread')
const getTransactionCostPath = getTransactionPath('transaction_cost')
const getGatewayPriceItem = title => applySpec({
  title: always(title),
  prices: juxt([
    pipe(
      getTransactionCostPath(title),
      createRealPrice
    ),
    pipe(
      getTransactionSpreadPath(title),
      createPercentagePrice
    ),
  ]),
})
const calcAntifraudeTotalPrice = (acc, { cost }) => acc + cost
const getAntifraudePrice = propName => pipe(
  propOr([], propName),
  reduce(calcAntifraudeTotalPrice, 0),
  createRealPrice
)
const gatewayCostArray = [
  getGatewayPriceItem('boleto'),
  getGatewayPriceItem('credit_card'),
  getGatewayPriceItem('debit_card'),
  getPriceEntry('antifraud_cost', getAntifraudePrice('antifraud_cost')),
  getPriceEntry('minimum_monthly_payment', getPriceFromProp('minimum_monthly_payment', createRealPrice)),
]

const rejectItemWithoutPrice = propName => reject(pipe(
  propOr([], propName),
  length,
  size => size < 1
))

const getGatewayCost = pipe(
  pathOr([], ['gateway', 'live']),
  pick(['transaction_cost', 'transaction_spread', 'minimum_monthly_payment', 'antifraud_cost']),
  juxt(gatewayCostArray),
  rejectItemWithoutPrice('prices'),
  createMainItem('gateway')
)

const pspCostArray = [
  getPriceEntry('anticipation', getPriceFromProp('anticipation', createPercentagePrice)),
]

const getPspCost = pipe(
  pathOr({}, ['psp', 'live']),
  juxt(pspCostArray),
  rejectItemWithoutPrice('prices'),
  createMainItem('psp')
)

const transferCostArray = [
  getPriceEntry('credito_em_conta', getPriceFromProp('credito_em_conta', createRealPrice)),
  getPriceEntry('ted', getPriceFromProp('ted', createRealPrice)),
  getPriceEntry('doc', getPriceFromProp('doc', createRealPrice)),
]

const getTransferCost = pipe(
  pathOr([], ['transfers']),
  juxt(transferCostArray),
  rejectItemWithoutPrice('prices'),
  createMainItem('transfers')
)

const mainItemArray = [
  getGatewayCost,
  getPspCost,
  getTransferCost,
]

const getPricing = pipe(
  propOr({}, 'pricing'),
  juxt(mainItemArray),
  rejectItemWithoutPrice('subItems')
)

export default getPricing
