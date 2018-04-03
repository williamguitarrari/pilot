import {
  __,
  divide,
  isNil,
  pipe,
} from 'ramda'
import Intl from 'intl'
import 'intl/locale-data/jsonp/pt'

const formatter = new Intl.NumberFormat(
  'pt-BR',
  {
    minimumFractionDigits: 2,
  }
)

const format = pipe(
  Number,
  divide(__, 100),
  formatter.format
)

const decimal = (value) => {
  if (isNil(value)) {
    return null
  }

  return format(value)
}

export default decimal
