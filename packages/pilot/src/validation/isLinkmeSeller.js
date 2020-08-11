import {
  both,
  complement,
  pipe,
  prop,
  propEq,
} from 'ramda'

import isPaymentLink from './isPaymentLink'

const isAdmin = propEq('permission', 'admin')

const isLinkmeSeller = both(
  pipe(prop('company'), isPaymentLink),
  pipe(prop('user'), complement(isAdmin))
)

export default isLinkmeSeller
