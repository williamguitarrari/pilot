import {
  __,
  add,
  always,
  applySpec,
  gt,
  juxt,
  lt,
  map,
  negate,
  path,
  pipe,
  reduce,
  sum,
  when,
  propOr,
  uncurryN,
} from 'ramda'

const absSum = pipe(
  map(Math.abs),
  sum
)

const getPositveOrZero = propPath => pipe(
  path(propPath),
  when(
    lt(__, 0),
    always(0)
  )
)

const getNegativeOrZero = propPath => pipe(
  path(propPath),
  when(
    gt(__, 0),
    always(0)
  )
)

const sumOut = pipe(
  path(['amount', 'out']),
  Math.abs
)

const sumIn = pipe(
  juxt([
    path(['amount', 'in']),
    getNegativeOrZero(['fee', 'out']),
    getNegativeOrZero(['fee', 'in']),
  ]),
  absSum
)

const buildTotal = direction => reduce((acc, { available }) => {
  if (direction === 'out') {
    return acc + sumOut(available)
  }

  return acc + sumIn(available)
}, 0)

const getOutgoing = pipe(
  buildTotal('out'),
  negate
)

const sumFee = pipe(
  juxt([
    getPositveOrZero(['fee', 'in']),
    getPositveOrZero(['fee', 'out']),
  ]),
  absSum,
  negate
)

const sumRecuder = uncurryN(2, acc => pipe(
  propOr({}, 'available'),
  sumFee,
  add(acc)
))

const getFee = reduce(sumRecuder, 0)

const buildBalanceTotal = applySpec({
  net: pipe(
    juxt([buildTotal('in'), getOutgoing, getFee]),
    sum
  ),
  outcoming: buildTotal('in'),
  outgoing: getOutgoing,
  fee: getFee,
})

export default buildBalanceTotal
