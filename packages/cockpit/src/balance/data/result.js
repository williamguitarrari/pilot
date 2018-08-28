import {
  __,
  always,
  apply,
  applySpec,
  assoc,
  either,
  head,
  ifElse,
  isEmpty,
  isNil,
  join,
  juxt,
  last,
  map,
  path,
  pathEq,
  pipe,
  pluck,
  prop,
  subtract,
  sum,
  when,
} from 'ramda'
import { buildPendingRequest } from '../../bulkAnticipations'

const getWithDv = propName => pipe(
  juxt([
    path(['bank_account', propName]),
    path(['bank_account', `${propName}_dv`]),
  ]),
  ifElse(
    pipe(last, isNil),
    head,
    join('-')
  )
)

const buildRecipient = pipe(
  prop('recipient'),
  applySpec({
    id: prop('id'),
    name: path(['bank_account', 'legal_name']),
    bank_account: {
      account: getWithDv('conta'),
      agency: getWithDv('agencia'),
      bank_code: path(['bank_account', 'bank_code']),
      id: path(['bank_account', 'id']),
      type: path(['bank_account', 'type']),
    },
  })
)

const buildBalance = applySpec({
  amount: path(['balance', 'available', 'amount']),
  available: {
    withdrawal: path(['balance', 'available', 'amount']),
  },
  outcoming: path(['balance', 'waiting_funds', 'amount']),
})

const buildRequests = pipe(
  prop('bulk_anticipations_pending'),
  buildPendingRequest
)

const isInvalidOperationDate = type => pipe(
  prop(type),
  isNil
)

const getOperationDate = (dateType, fallbackDateType) => pipe(
  prop('movement_object'),
  ifElse(
    isInvalidOperationDate(dateType),
    prop(fallbackDateType),
    prop(dateType)
  ),
  when(
    either(isNil, isEmpty),
    always(null)
  )
)

const transformMovementTypePropTo = (propName, to = propName) => pipe(
  path(['movement_object', propName]),
  when(either(isNil, isEmpty), always(0)),
  Math.abs,
  assoc('amount', __, { type: to })
)

const buildOperationOutcoming = ifElse(
  pathEq(['movement_object', 'type'], 'refund'),
  juxt([
    transformMovementTypePropTo('fee', 'mdr'),
  ]),
  juxt([
    transformMovementTypePropTo('amount', 'payable'),
  ])
)

const buildOperationOutgoing = ifElse(
  pathEq(['movement_object', 'type'], 'refund'),
  juxt([
    transformMovementTypePropTo('amount', 'payable'),
    transformMovementTypePropTo('anticipation_fee'),
  ]),
  juxt([
    transformMovementTypePropTo('fee', 'mdr'),
    transformMovementTypePropTo('anticipation_fee'),
  ])
)

const buildOperationsRows = pipe(
  prop('operations'),
  map(applySpec({
    id: prop('id'),
    net: pipe(
      juxt([
        pipe(buildOperationOutcoming, pluck('amount'), sum),
        pipe(buildOperationOutgoing, pluck('amount'), sum),
      ]),
      apply(subtract)
    ),
    outcoming: buildOperationOutcoming,
    outgoing: buildOperationOutgoing,
    payment_date: {
      actual: getOperationDate('payment_date', 'date_created'),
      original: getOperationDate('original_payment_date'),
    },
    type: path(['movement_object', 'type']),
  }))
)

const buildOperationsCount = query => (result) => {
  if (query.count > result.operations.length) {
    return query.page
  }

  return 100
}

const buildOperationsTotal = query => (result) => {
  if (query.count > result.operations.length) {
    return result.operations.length
  }

  return 1000
}

const buildResult = query => applySpec({
  query: always(query),
  result: {
    balance: buildBalance,
    recipient: buildRecipient,
    requests: buildRequests,
    search: {
      operations: {
        count: buildOperationsCount(query),
        offset: always(0),
        rows: buildOperationsRows,
        total: buildOperationsTotal(query),
      },
    },
  },
})

export default buildResult
