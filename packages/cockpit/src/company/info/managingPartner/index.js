import {
  applySpec,
  pipe,
  propOr,
} from 'ramda'

const formatMangingPartner = applySpec({
  name: propOr('', 'name'),
  cpf: propOr('', 'cpf'),
  phone_number: propOr('', 'phone_number'),
})

export default pipe(
  propOr({}, 'managing_partner'),
  formatMangingPartner
)
