import {
  __,
  F,
  T,
  always,
  anyPass,
  apply,
  applySpec,
  complement,
  cond,
  defaultTo,
  equals,
  flatten,
  ifElse,
  isEmpty,
  isNil,
  juxt,
  length,
  map,
  mergeAll,
  mergeDeepWith,
  objOf,
  path,
  pipe,
  prop,
  subtract,
  unless,
  when,
} from 'ramda'

const isInternational = ifElse(
  complement(equals('BRAZIL')),
  T,
  F
)

const isAntifraudScoreNil = pipe(
  prop('antifraud_score'),
  isNil
)

const isRefuseReasonNil = pipe(
  prop('refuse_reason'),
  isNil
)

const isRefuseReasonAntifraud = pipe(
  prop('refuse_reason'),
  equals('antifraud')
)

const antifraudRecommendation = cond([
  [isAntifraudScoreNil, always(null)],
  [isRefuseReasonNil, always(null)],
  [isRefuseReasonAntifraud, always('refused')],
  [T, always('approved')],
])

const getAntifraudProp = ifElse(
  pipe(prop('antifraud_score'), isNil),
  always(null),
  applySpec({
    recommendation: antifraudRecommendation,
    score: prop('antifraud_score'),
  })
)

const getCustomerSubProp = subProp =>
  path(['customer', subProp])

const getCustomerProp = ifElse(
  pipe(prop('customer'), isNil),
  always(null),
  applySpec({
    name: getCustomerSubProp('name'),
    document_number: getCustomerSubProp('document_number'),
    email: getCustomerSubProp('email'),
  })
)

const getCardProp = subProp =>
  path(['card', subProp])

const mapSourceToTableRows = applySpec({
  id: prop('id'),
  status: prop('status'),
  refuse_reason: prop('refuse_reason'),
  created_at: prop('date_created'),
  updated_at: prop('date_updated'),
  boleto: {
    url: prop('boleto_url'),
  },
  payment: {
    method: prop('payment_method'),
    paid_amount: prop('paid_amount'),
    net_amount: prop('amount'),
    cost_amount: prop('cost'),
    installments: prop('installments'),
  },
  antifraud: getAntifraudProp,
  customer: getCustomerProp,
  card: {
    holder_name: getCardProp('holder_name'),
    brand_name: getCardProp('brand'),
    international: pipe(getCardProp('country'), isInternational),
  },
})

const buildTableRows = map(pipe(prop('_source'), mapSourceToTableRows))

const parseStatusValue = pipe(
  juxt([
    prop('key'),
    path(['amount', 'value']),
  ]),
  apply(objOf)
)

const buildStatusesValues = pipe(
  map(parseStatusValue),
  mergeAll
)

const buildDataSet = ({
  key_as_string: date,
  per_status: perStatus,
}) => ({
  name: date,
  ...buildStatusesValues(perStatus.buckets),
})

const buildChartDataSet = pipe(
  when(anyPass([isNil, isEmpty]), always([])),
  map(buildDataSet),
  flatten
)

const defaultTotalAmount = defaultTo(0)

const getAggregationTotal = amountPath => pipe(
  path(amountPath),
  defaultTotalAmount
)

const getPaidAmount = getAggregationTotal([
  'aggregations',
  'total_amount',
  'value',
])

const getCostAmount = getAggregationTotal([
  'aggregations',
  'total_cost',
  'value',
])

const getNetAmount = pipe(
  juxt([getPaidAmount, getCostAmount]),
  apply(subtract)
)

const ascNames = anyPass([equals('asc'), equals('ascending')])
const descNames = anyPass([equals('desc'), equals('descending')])

const formatOrder = cond([
  [ascNames, always('ascending')],
  [descNames, always('descending')],
  [T, always('ascending')],
])

const buildQuery = unless(
  pipe(prop('sort'), isNil),
  mergeDeepWith(formatOrder, __, { sort: { order: null } })
)

const buildResult = query => applySpec({
  query: always(buildQuery(query)),
  result: {
    total: {
      count: path(['hits', 'total']),
      payment: {
        paid_amount: getPaidAmount,
        net_amount: getNetAmount,
      },
    },
    list: {
      offset: always(query.offset),
      count: pipe(path(['hits', 'hits']), length),
      rows: pipe(path(['hits', 'hits']), buildTableRows),
    },
    chart: {
      dataset: pipe(path([
        'aggregations',
        'total_per_day',
        'buckets',
      ]), buildChartDataSet),
    },
  },
})

export default buildResult
