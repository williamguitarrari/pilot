import { applySpec } from 'ramda'
import transactions from './transactions'
import proxy from './proxy'
import user from './user'
import company from './company'
import invites from './invites'

const cockpit = applySpec({
  transactions,
  user,
  company,
  invites,
})

export default proxy(cockpit)
