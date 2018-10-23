import {
  concat,
  pipe,
  replace,
} from 'ramda'

const formatPhone = pipe(
  replace(/\D+/g, ''),
  concat('+55')
)

export default formatPhone
