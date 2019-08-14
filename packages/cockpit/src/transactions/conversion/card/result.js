import {
  applySpec,
  pathOr,
  pipe,
} from 'ramda'

const realPath = pathOr(0, ['aggregations', 'conversion', 'value', 'real'])

const withoutRetriesPath = pathOr(0, ['aggregations', 'conversion', 'value', 'withoutRetries'])

const total = pathOr(0, ['hits', 'total'])

const paid = pathOr(0, ['aggregations', 'paid', 'doc_count'])

const getConversion = conversionPath => pipe(
  conversionPath,
  Math.round
)

const buildResult = applySpec({
  conversion: getConversion(realPath),
  paid: getConversion(paid),
  total: getConversion(total),
  withoutRetries: getConversion(withoutRetriesPath),
})

export default buildResult
