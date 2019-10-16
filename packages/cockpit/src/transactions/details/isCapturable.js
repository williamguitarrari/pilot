import {
  ifElse,
  propEq,
} from 'ramda'
import moment from 'moment-timezone'

const isAuthorized = propEq('status', 'authorized')
const isFromCheckout = propEq('referer', 'encryption_key')
const isTokenValid = (transaction) => {
  const createdAt = moment(transaction.date_created)

  return moment().diff(createdAt, 'hours') < 5
}

const isCapturable = ifElse(
  isFromCheckout,
  isAuthorized && isTokenValid,
  isAuthorized
)

export default isCapturable
