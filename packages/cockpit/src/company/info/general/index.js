import {
  applySpec,
  propOr,
} from 'ramda'

export default applySpec({
  name: propOr('', 'name'),
  phoneNumber: propOr('', 'phone_number'),
  siteUrl: propOr('', 'siteUrl'),
  statementDescriptor: propOr('', 'statement_descriptor'),
  fullName: propOr('', 'full_name'),
  cnpj: propOr('', 'cnpj'),
})

