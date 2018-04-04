import { applySpec } from 'ramda'
import balance from './balance'
import business from './business'
import proxy from './proxy'
import transactions from './transactions'

const cockpit = applySpec({
  balance,
  business,
  transactions,
})

export default proxy(cockpit)
