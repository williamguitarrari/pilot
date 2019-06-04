import {
  __,
  add,
  always,
  applySpec,
  converge,
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
  juxt([
    path(['amount', 'out']),
    getPositveOrZero(['fee', 'in']),
    getPositveOrZero(['fee', 'out']),
  ]),
  absSum
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

const buildBalanceTotal = applySpec({
  net: converge(
    add,
    [buildTotal('in'), getOutgoing]
  ),
  outcoming: buildTotal('in'),
  outgoing: getOutgoing,
})

export default buildBalanceTotal
