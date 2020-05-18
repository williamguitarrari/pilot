import {
  applySpec,
  propOr,
} from 'ramda'

export default applySpec({
  name: propOr('', 'name'),
  phoneNumber: propOr('', 'phone_number'),
  siteUrl: propOr('', 'site_url'),
  statementDescriptor: propOr('', 'statement_descriptor'),
  fullName: propOr('', 'full_name'),
  cnpj: propOr('', 'cnpj'),
  max_chargeback_index: propOr(2, 'max_chargeback_index'),
})

