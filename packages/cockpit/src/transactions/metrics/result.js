import {
  applySpec,
  converge,
  divide,
  equals,
  head,
  inc,
  is,
  map,
  path,
  pipe,
  prop,
  sortBy,
  toString,
  unless,
  when,
} from 'ramda'

const getBucketsPropFrom = propName => path([propName, 'buckets'])

const propAsString = propName => pipe(
  prop(propName),
  unless(
    is(String),
    toString
  )
)

const formatBuckets = map(applySpec({
  title: propAsString('key'),
  value: prop('doc_count'),
}))

const getMetrics = pipe(
  prop('aggregations'),
  getBucketsPropFrom('metrics'),
  head
)

const getVolume = pipe(
  getMetrics,
  path(['volume', 'value'])
)

const getTotalTransactions = path(['hits', 'total'])

const divideTruncate = pipe(
  divide,
  Math.trunc
)

const incrementIfZero = when(
  equals(0),
  inc
)

const getAverageAmount = converge(
  divideTruncate,
  [getVolume, pipe(
    getTotalTransactions,
    incrementIfZero
  )]
)

const getInstallments = pipe(
  getMetrics,
  getBucketsPropFrom('installments'),
  sortBy(prop('key')),
  formatBuckets
)

const buildBucketsFrom = propName => pipe(
  getBucketsPropFrom(propName),
  formatBuckets
)

const buildAggregationBuckets = propName => pipe(
  getMetrics,
  buildBucketsFrom(propName)
)

const buildResult = applySpec({
  averageAmount: getAverageAmount,
  cardBrands: buildAggregationBuckets('card_brand'),
  installments: getInstallments,
  paymentMethods: buildAggregationBuckets('payment_method'),
  refuseReasons: buildAggregationBuckets('refuse_reason'),
  status: buildAggregationBuckets('status'),
  totalAmount: getVolume,
  totalTransactions: getTotalTransactions,
})

export default buildResult
