import {
  propEq,
  cond,
  always,
  allPass,
  T,
} from 'ramda'

const isCreditCard = propEq('method', 'credit_card')

const isIntlCreditCard = allPass([
  isCreditCard,
  propEq('international', true),
])

const isDebitCard = propEq('method', 'debit_card')

const isBoleto = propEq('method', 'boleto')

const formatPaymentMethod = cond([
  [isIntlCreditCard, always('models.transaction.international_credit_card')],
  [isCreditCard, always('models.transaction.credit_card')],
  [isDebitCard, always('models.transaction.debit_card')],
  [isBoleto, always('models.transaction.boleto')],
  [T, always(null)],
])

export default formatPaymentMethod
