import {
  either,
  head,
  ifElse,
  isEmpty,
  isNil,
  join,
  last,
  pipe,
} from 'ramda'

const isNilOrEmpty = either(isNil, isEmpty)
const formatter = ifElse(
  pipe(
    last,
    isNilOrEmpty
  ),
  head,
  join('-')
)

const agencyAccount = (number, checkDigit) => formatter([number, checkDigit])

export default agencyAccount
