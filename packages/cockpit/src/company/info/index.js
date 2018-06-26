import { applySpec } from 'ramda'
import apiKeys from './apiKeys'
import address from './address'
import general from './general'
import managingPartner from './managingPartner'
import pricing from './pricing'
import team from './team'

const info = client => () => client
  .company
  .current()
  .then(applySpec({
    pricing,
    apiKeys,
    team,
    general,
    address,
    managingPartner,
  }))

export default info
