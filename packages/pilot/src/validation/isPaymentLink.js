import {
  either,
  equals,
  propEq,
} from 'ramda'

const isPaymentLink = either(
  propEq('type', 'payment_link_app'),
  equals('payment_link_app')
)

export default isPaymentLink
