import { applySpec } from 'ramda'
import address from './address'
import apiKeys from './apiKeys'
import apiVersion from './apiVersion'
import general from './general'
import managingPartner from './managingPartner'
import pricing from './pricing'
import team from './team'

const info = client => () => client
  .company
  .current()
  .then(applySpec({
    pricing,
    apiVersion,
    apiKeys,
    team,
    general,
    address,
    managingPartner,
  }))

export default info
