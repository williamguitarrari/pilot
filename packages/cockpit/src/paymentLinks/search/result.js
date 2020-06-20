import { applySpec, path, pipe, pluck } from 'ramda'

const makeRows = pipe(
  path(['hits', 'hits']),
  pluck('_source')
)

const result = applySpec({
  totalPaymentLinks: path(['hits', 'total']),
  rows: makeRows,
})

export default result
