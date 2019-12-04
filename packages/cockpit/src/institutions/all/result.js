import {
  applySpec,
  map,
  prop,
} from 'ramda'

const buildName = institution => (
  `${prop('number_code', institution)} - ${prop('short_name', institution)}`
)

const buildInstitution = applySpec({
  value: prop('number_code'),
  name: buildName,
})

const buildResultList = map(buildInstitution)

export default buildResultList
