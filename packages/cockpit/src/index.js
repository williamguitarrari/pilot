import { applySpec } from 'ramda'
import transactions from './transactions'

const client = applySpec({
  transactions,
})

export default client
