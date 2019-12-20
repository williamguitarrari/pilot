import {
  reduce,
  uncurryN,
} from 'ramda'

const buildErrorsMessage = uncurryN(2, message => reduce((acc, value) => ({
  ...acc,
  [value]: message,
}), {}))

export default buildErrorsMessage
