import {
  always,
  apply,
  applySpec,
  assoc,
  complement,
  either,
  flatten,
  groupBy,
  has,
  head,
  identity,
  ifElse,
  isEmpty,
  isNil,
  juxt,
  last,
  lensPath,
  map,
  mergeAll,
  mergeDeepWithKey,
  objOf,
  path,
  pathEq,
  pick,
  pipe,
  pluck,
  prop,
  propEq,
  propSatisfies,
  props,
  reduce,
  reject,
  reverse,
  set,
  sort,
  subtract,
  sum,
  unless,
  values,
  when,
} from 'ramda'

import moment from 'moment'

import { transactionSpec } from '../shared'

const sortByCreatedAt = sort((left, right) => {
  if (has('created_at', right)) {
    return moment(right.created_at)
      .diff(moment(left.created_at), 'milliseconds')
  }

  return moment(right.date_created)
    .diff(moment(left.date_created), 'milliseconds')
})

const normalizeChargebackOps = pipe(
  groupBy(prop('type')),
  map(pipe(
    groupBy(prop('cycle')),
    map(pipe(sortByCreatedAt, head)),
  )),
  values,
  map(values),
  flatten
)

const chooseOperations = ifElse(
  pathEq(['transaction', 'payment_method'], 'boleto'),
  prop('gatewayOperations'),
  pipe(
    pick(['gatewayOperations', 'chargebackOperations']),
    juxt([
      prop('gatewayOperations'),
      pipe(prop('chargebackOperations'), normalizeChargebackOps),
    ]),
    flatten,
    reject(propEq('type', 'conciliate'))
  )
)

const createOperationObj = applySpec({
  id: prop('id'),
  created_at: ifElse(
    has('date_created'),
    prop('date_created'),
    prop('created_at')
  ),
  type: prop('type'),
  status: ifElse(
    has('status'),
    prop('status'),
    always('success')
  ),
  cycle: ifElse(
    has('cycle'),
    prop('cycle'),
    always(null)
  ),
})

const buildOperations = applySpec({
  operations: pipe(
    chooseOperations,
    map(createOperationObj),
    sortByCreatedAt
  ),
})

const sumInstallmentsAmount = pipe(
  prop('installments'),
  pluck('amount'),
  sum
)

const sumAllPayableFees = pipe(props(['fee', 'anticipation_fee']), sum)
const payablesAllFeesTotalAmount = pipe(
  map(sumAllPayableFees),
  sum
)

const sumInstallmentsCostAmount = pipe(
  prop('installments'),
  payablesAllFeesTotalAmount
)

const mergeInstallment = (key, left, right) => {
  switch (key) {
    case 'amount':
    case 'net_amount':
    case 'mdr':
    case 'anticipation':
      return left + right
    default:
      return right
  }
}

const aggregateInstallments = (acc, installment) =>
  mergeDeepWithKey(mergeInstallment, acc, installment)

const mapRecipients = map(applySpec({
  name: path(['recipient', 'bank_account', 'legal_name']),
  amount: sumInstallmentsAmount,
  net_amount: pipe(
    juxt([
      sumInstallmentsAmount,
      sumInstallmentsCostAmount,
    ]),
    apply(subtract)
  ),
  status: pipe(
    prop('installments'),
    sortByCreatedAt,
    last,
    prop('status')
  ),
  liabilities: pipe(
    juxt([
      ifElse(
        propEq('charge_processing_fee', true),
        always('mdr'),
        always(null)
      ),
      ifElse(
        propEq('liable', true),
        always('chargeback'),
        always(null)
      ),
    ]),
    reject(isNil)
  ),
  installments: pipe(
    prop('installments'),
    map(applySpec({
      number: prop('installment'),
      status: prop('status'),
      payment_date: prop('payment_date'),
      original_payment_date: prop('original_payment_date'),
      created_at: prop('date_created'),
      amount: prop('amount'),
      net_amount: pipe(
        juxt([prop('amount'), sumAllPayableFees]),
        apply(subtract)
      ),
      costs: {
        mdr: prop('fee'),
        anticipation: prop('anticipation_fee'),
      },
    })),
    groupBy(prop('number')),
    map(sortByCreatedAt),
    map(reduce(aggregateInstallments, {})),
    values,
    reverse
  ),
}))

const buildRecipients = applySpec({
  recipients: unless(isEmpty, mapRecipients),
})

const hasSplitRules = propSatisfies(complement(isEmpty), 'split_rules')

/* eslint-disable-next-line camelcase */
const groupInstallments = ({ split_rules, payables }) =>
  split_rules.map(rule => ({
    ...rule,
    installments: payables.filter(propEq('split_rule_id', rule.id)),
  }))

const buildNewSplitRules = when(
  hasSplitRules,
  pipe(
    juxt([groupInstallments, identity]),
    apply(assoc('split_rules'))
  )
)

const buildReasonCode = pipe(
  ifElse(
    either(isNil, isEmpty),
    always(null),
    pipe(
      last,
      prop('reason_code')
    )
  ),
  objOf('reason_code')
)

const mapTransactionToResult = applySpec({
  transaction: pipe(
    juxt([
      pipe(prop('transaction'), applySpec(transactionSpec)),
      pipe(
        pick([
          'gatewayOperations',
          'chargebackOperations',
          'transaction',
        ]),
        buildOperations
      ),
      pipe(prop('split_rules'), buildRecipients),
      pipe(prop('chargebackOperations'), buildReasonCode),
    ]),
    mergeAll
  ),
})

const mdrLens = lensPath(['transaction', 'payment', 'mdr_amount'])

const sumInstallmentsMdrCost = pipe(
  prop('installments'),
  map(path(['costs', 'mdr'])),
  sum
)

const sumAllRecipientsMdrCost = pipe(
  path(['transaction', 'recipients']),
  map(sumInstallmentsMdrCost),
  sum
)

const netAmountLens = lensPath(['transaction', 'payment', 'net_amount'])

const subtractMdrFromNetAmount = pipe(
  path(['transaction', 'payment']),
  props(['net_amount', 'mdr_amount']),
  apply(subtract)
)

export default pipe(
  buildNewSplitRules,
  mapTransactionToResult,
  juxt([sumAllRecipientsMdrCost, identity]),
  apply(set(mdrLens)),
  juxt([subtractMdrFromNetAmount, identity]),
  apply(set(netAmountLens))
)
