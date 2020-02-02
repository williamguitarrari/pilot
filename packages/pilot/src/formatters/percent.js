
import { isNil } from 'ramda'
import Intl from 'intl'
import 'intl/locale-data/jsonp/pt'

const percent = (value) => {
  if (isNil(value)) {
    return null
  }

  const formatter = new Intl.NumberFormat(
    'pt-BR',
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: 'percent',
    }
  )

  return formatter.format(Number(value) / 100)
}

export default percent
