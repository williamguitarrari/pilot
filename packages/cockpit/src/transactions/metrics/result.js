import {
  applySpec,
  converge,
  divide,
  equals,
  evolve,
  head,
  inc,
  is,
  last,
  map,
  mergeRight,
  path,
  pipe,
  pluck,
  prop,
  propOr,
  range,
  reduce,
  sortBy,
  sum,
  toPairs,
  toString,
  unless,
  when,
} from 'ramda'
import moment from 'moment-timezone'

const getBucketsPropFrom = propName => path([propName, 'buckets'])

const propAsString = propName => pipe(
  prop(propName),
  unless(
    is(String),
    toString
  )
)

const arrayToObjects = spec => map(applySpec(spec))

const formatBuckets = arrayToObjects({
  title: propAsString('key'),
  value: prop('doc_count'),
})

const getMetrics = pipe(
  prop('aggregations'),
  getBucketsPropFrom('metrics'),
  head
)

const getVolume = path(['volume', 'value'])

const sumPaidTransactions = pipe(
  getMetrics,
  getBucketsPropFrom('paidTransactions'),
  map(getVolume),
  sum
)

const getTotalTransactions = path(['hits', 'total'])

const getTotalPaidTransactions = pipe(
  getMetrics,
  getBucketsPropFrom('paidTransactions'),
  pluck('doc_count'),
  sum
)

const getLocalizedWeekdayName = date => date.format('ddd')

const getNamedWeekdays = map(evolve({
  key: weekdayNumber => getLocalizedWeekdayName(moment().day(weekdayNumber)),
}))

const defaultWeekdays = reduce(
  (acc, weekdayNumber) => ({
    ...acc,
    [weekdayNumber]: 0,
  }),
  {},
  range(0, 7)
)

const aggregateWeekdaysVolume = reduce((acc, {
  doc_count: volume,
  key,
}) => ({
  ...acc,
  [key]: propOr(0, key, acc) + volume,
}), {})

const getWeekdayNumberFromTimestamp = pipe(
  moment.utc,
  date => date.day()
)

const getNumberedWeekdays = arrayToObjects({
  key: pipe(
    prop('key'),
    getWeekdayNumberFromTimestamp
  ),
  doc_count: path(['volume', 'value']),
})

const buildWeekdays = pipe(
  getNumberedWeekdays,
  aggregateWeekdaysVolume,
  mergeRight(defaultWeekdays),
  toPairs,
  arrayToObjects({
    doc_count: last,
    key: head,
  }),
  sortBy(prop('key')),
  getNamedWeekdays,
  formatBuckets
)

const getVolumeByWeekday = pipe(
  path(['aggregations', 'weekdayVolume']),
  getBucketsPropFrom('weekdays'),
  buildWeekdays
)

const incrementIfZero = when(
  equals(0),
  inc
)

const getAverageAmount = converge(
  pipe(
    divide,
    Math.round
  ),
  [sumPaidTransactions, pipe(
    getTotalPaidTransactions,
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
  totalAmount: sumPaidTransactions,
  totalTransactions: getTotalTransactions,
  volumeByWeekday: getVolumeByWeekday,
})

export default buildResult
