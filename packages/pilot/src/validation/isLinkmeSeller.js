import {
  both,
  complement,
  pipe,
  prop,
  propOr,
  propEq,
} from 'ramda'

import isPaymentLink from './isPaymentLink'

const isAdmin = propEq('permission', 'admin')

const isLinkmeSeller = both(
  pipe(prop('company'), isPaymentLink),
  pipe(propOr({}, 'user'), complement(isAdmin))
)

export default isLinkmeSeller
