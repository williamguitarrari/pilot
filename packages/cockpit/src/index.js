import { applySpec } from 'ramda'
import balance from './balance'
import business from './business'
import proxy from './proxy'
import user from './user'
import company from './company'
import invites from './invites'
import recipient from './recipient'
import transactions from './transactions'

const cockpit = applySpec({
  balance,
  business,
  transactions,
  user,
  company,
  invites,
  recipient,
})

export default proxy(cockpit)
