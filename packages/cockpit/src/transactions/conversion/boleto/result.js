import {
  always,
  apply,
  applySpec,
  divide,
  equals,
  ifElse,
  juxt,
  last,
  multiply,
  pathOr,
  pipe,
} from 'ramda'

const total = pathOr(0, ['aggregations', 'boleto', 'doc_count'])

const paid = pathOr(0, ['aggregations', 'boleto', 'paid', 'doc_count'])

const getPercentage = pipe(
  apply(divide),
  multiply(100)
)

const lastEquals = value => pipe(
  last,
  equals(value)
)

const conversion = pipe(
  juxt([
    paid,
    total,
  ]),
  ifElse(
    lastEquals(0),
    always(100),
    getPercentage
  )
)

const buildResult = applySpec({
  total,
  paid,
  conversion,
})

export default buildResult
