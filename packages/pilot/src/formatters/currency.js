import { isNil } from 'ramda'
import Intl from 'intl'
import 'intl/locale-data/jsonp/pt'

const currency = (value) => {
  if (isNil(value)) {
    return null
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  })

  return formatter.format(Number(value) / 100)
}

export default currency
