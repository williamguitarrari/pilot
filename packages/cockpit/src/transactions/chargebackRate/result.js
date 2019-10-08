import {
  always,
  any,
  apply,
  applySpec,
  divide,
  equals,
  ifElse,
  juxt,
  path,
  pipe,
} from 'ramda'

const getTotal = model => path([model, 'hits', 'total'])

const calculateChargebackRate = pipe(
  juxt([
    getTotal('chargebacks'),
    getTotal('transactions'),
  ]),
  ifElse(
    any(equals(0)),
    always(0),
    apply(divide)
  )
)

const buildChargebackRate = applySpec({
  chargebacks: getTotal('chargebacks'),
  transactions: getTotal('transactions'),
  chargebackRate: calculateChargebackRate,
})

export default buildChargebackRate
