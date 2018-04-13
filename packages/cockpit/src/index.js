import { applySpec } from 'ramda'
import transactions from './transactions'
import proxy from './proxy'

const cockpit = applySpec({
  transactions,
})

export default proxy(cockpit)
