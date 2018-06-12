import { applySpec } from 'ramda'
import transactions from './transactions'
import company from './company'
import invites from './invites'

import proxy from './proxy'

const cockpit = applySpec({
  company,
  invites,
  transactions,
})

export default proxy(cockpit)
