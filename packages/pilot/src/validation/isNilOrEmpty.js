import {
  anyPass,
  isEmpty,
  isNil,
} from 'ramda'

const isNilOrEmpty = anyPass([isNil, isEmpty])

export default isNilOrEmpty
