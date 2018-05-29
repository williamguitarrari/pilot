import {
  always,
  applySpec,
  ifElse,
  juxt,
  merge,
  mergeAll,
  path,
  pick,
  pipe,
  prop,
  propEq,
} from 'ramda'

const buildNewMetadata = ({ metadata, id }) => merge(
  { pagarme_original_transaction_id: id },
  metadata
)

const getCardId = ifElse(
  propEq('payment_method', 'credit_card'),
  path(['card', 'id']),
  always(null)
)

const getCustomer = pipe(
  juxt([
    prop('customer'),
    pick(['phone']),
    pick(['address']),
  ]),
  mergeAll
)

export default applySpec({
  amount: prop('amount'),
  antifraud_metadata: prop('antifraud_metadata'),
  card_id: getCardId,
  customer: getCustomer,
  installments: prop('installments'),
  metadata: buildNewMetadata,
  payment_method: prop('payment_method'),
  postback_url: prop('postback_url'),
  split_rules: prop('split_rules'),
})
