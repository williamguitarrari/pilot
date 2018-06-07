import {
  allPass,
  always,
  apply,
  applySpec,
  complement,
  cond,
  either,
  equals,
  flatten,
  has,
  head,
  ifElse,
  is,
  isEmpty,
  isNil,
  join,
  juxt,
  last,
  length,
  map,
  of,
  path,
  pathSatisfies,
  pipe,
  prop,
  propEq,
  propOr,
  propSatisfies,
  props,
  reject,
  replace,
  splitAt,
  subtract,
  sum,
  T,
  unless,
  when,
} from 'ramda'

import moment from 'moment'

const isInternational = complement(equals)('BRAZIL')

const isAntifraudScoreNil = pipe(
  prop('antifraud_score'),
  isNil
)

const isRefuseReasonNil = pipe(
  prop('refuse_reason'),
  isNil
)

const getCardProp = subProp => cond([
  [
    pipe(
      prop('card'),
      allPass([is(Object), has(subProp)])
    ),
    path(['card', subProp]),
  ],
  [has(`card_${subProp}`), prop(`card_${subProp}`)],
  [T, always(null)],
])

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

const getCustomerSubProp = subProp => ifElse(
  pathSatisfies(complement(isNil), ['customer', subProp]),
  path(['customer', subProp]),
  always(null)
)

const formatPhoneNumber = (number) => {
  if (!number) return ''
  const len = length(number) - 4
  return join('-', splitAt(len, number))
}

const formatPhoneProp = pipe(
  props(['ddd', 'number']),
  juxt([
    pipe(
      head,
      h => `(${h})`
    ),
    pipe(
      last,
      formatPhoneNumber
    ),
  ]),
  join(' ')
)

const getPhoneProp = pipe(
  prop('phone'),
  ifElse(
    either(isNil, isEmpty),
    always(null),
    formatPhoneProp
  )
)

const phoneGroupsRegex = /(\+\d{2})(\d{2})(\d{4,5})(\d{4})/

const formatPhone = (phone) => {
  if (!phone) {
    return null
  }

  return replace(phoneGroupsRegex, '$1 ($2) $3-$4', phone)
}

const getFormatedPhones = pipe(
  getCustomerSubProp('phone_numbers'),
  unless(
    isNil,
    map(formatPhone)
  )
)

const getPhones = pipe(
  juxt([
    pipe(
      getPhoneProp,
      of
    ),
    getFormatedPhones,
  ]),
  flatten,
  reject(isNil)
)

const getDocuments = pipe(
  prop('customer'),
  juxt([
    pipe(
      applySpec({
        number: prop('document_number'),
        type: prop('document_type'),
      }),
      of
    ),
    prop('documents'),
  ]),
  flatten,
  reject(isNil)
)

const getCustomerProp = ifElse(
  pipe(prop('customer'), isNil),
  always(null),
  applySpec({
    address: prop('address'),
    birth_date: getCustomerSubProp('birthday'),
    born_at: getCustomerSubProp('born_at'),
    country: getCustomerSubProp('country'),
    created_at: getCustomerSubProp('date_created'),
    documents: getDocuments,
    email: getCustomerSubProp('email'),
    external_id: getCustomerSubProp('external_id'),
    gender: getCustomerSubProp('gender'),
    id: getCustomerSubProp('id'),
    individual: getCustomerSubProp('individual'),
    name: getCustomerSubProp('name'),
    object: getCustomerSubProp('object'),
    phones: getPhones,
  })
)

const buildCard = when(
  has('card_holder_name'),
  applySpec({
    brand_name: getCardProp('brand'),
    capture_method: getCardProp('capture_method'),
    first_digits: getCardProp('first_digits'),
    holder_name: getCardProp('holder_name'),
    international: pipe(getCardProp('country'), isInternational),
    last_digits: getCardProp('last_digits'),
    pin_mode: getCardProp('pin_mode'),
  })
)

const getSubscription = applySpec({
  id: propOr(null, 'subscription_id'),
})

const transactionSpec = {
  acquirer: {
    name: prop('acquirer_name'),
    response_code: prop('acquirer_response_code'),
    sequence_number: unless(isNil, pipe(prop('nsu'), String)),
    transaction_id: unless(isNil, pipe(prop('tid'), String)),
  },
  amount: prop('amount'),
  antifraud: getAntifraudProp,
  boleto: ifElse(
    propEq('payment_method', 'boleto'),
    applySpec({
      barcode: prop('boleto_barcode'),
      due_date: pipe(prop('boleto_expiration_date'), unless(isNil, moment)),
      url: prop('boleto_url'),
    }),
    always(null)
  ),
  card: buildCard,
  created_at: pipe(prop('date_created'), unless(isNil, moment)),
  customer: getCustomerProp,
  external_id: propOr(null, 'reference_key'),
  id: prop('id'),
  metadata: prop('metadata'),
  payment: {
    cost_amount: prop('cost'),
    installments: prop('installments'),
    method: prop('payment_method'),
    net_amount: pipe(
      juxt([
        prop('paid_amount'),
        pipe(
          props(['cost', 'refunded_amount']),
          sum
        ),
      ]),
      apply(subtract)
    ),
    paid_amount: prop('paid_amount'),
    refund_amount: prop('refunded_amount'),
  },
  postback_url: ifElse(
    propSatisfies(either(isNil, isEmpty), 'postback_url'),
    always(null),
    prop('postback_url')
  ),
  risk_level: prop('risk_level'),
  soft_descriptor: prop('soft_descriptor'),
  status: prop('status'),
  status_reason: ifElse(
    propEq('status', 'refused'),
    prop('refuse_reason'),
    prop('status_reason')
  ),
  subscription: ifElse(
    propSatisfies(complement(isNil), 'subscription_id'),
    getSubscription,
    always(null)
  ),
  updated_at: pipe(prop('date_updated'), unless(isNil, moment)),
}

export {
  getAntifraudProp,
  getCustomerProp,
  getCardProp,
  isInternational,
  transactionSpec,
}
