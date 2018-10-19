import fetch from 'isomorphic-fetch'
import moment from 'moment'
import {
  always,
  applySpec,
  concat,
  ifElse,
  isNil,
  join,
  pipe,
  prop,
  propEq,
  replace,
  reverse,
  split,
  unless,
} from 'ramda'
import { apiUrl } from '../../environment'

const buildMql = applySpec({
  answers: {
    sales_starts: prop('salesStarts'),
    tpv: prop('amount'),
    platform: prop('platform'),
    segment: prop('segment'),
  },
})

const formatDate = date => moment(date).format('x')

const getTimestampFromBirthDate = pipe(
  prop('birthDate'),
  unless(
    isNil,
    pipe(
      split('/'),
      reverse,
      join('-'),
      formatDate,
      Number
    )
  )
)

const getDocumentType = ifElse(
  propEq('hasCNPJ', true),
  always('cnpj'),
  always('cpf')
)

const formatPhoneNumber = phone =>
  pipe(
    prop(phone),
    replace(/\D+/g, ''),
    concat('+55')
  )

const buildCompanyParameters = applySpec({
  company_template_token: always('cjkifh2ja0000y0739q5odyyt'),
  email: prop('email'),
  name: prop('tradeName'),
  password: prop('password'),
  full_name: prop('legalName'),
  document_type: getDocumentType,
  document_number: prop('cnpj'),
  site_url: prop('site'),
  partner_name: prop('partnerName'),
  partner_cpf: prop('cpf'),
  partner_birthday: getTimestampFromBirthDate,
  partner_mother_name: prop('montherName'),
  partner_phone: formatPhoneNumber('phone'),
  partner_street: prop('street'),
  partner_complementary: prop('complement'),
  partner_street_number: prop('number'),
  partner_neighborhood: prop('neighborhood'),
  partner_city: prop('city'),
  partner_state: prop('state'),
  partner_zipcode: prop('cep'),
  agreement_term_version: always(1),
  mql: buildMql,
  primary_phone: formatPhoneNumber('commercialPhone'),
})

const registerCompany = (registerData) => {
  const body = JSON.stringify(buildCompanyParameters(registerData))
  return fetch(`${apiUrl}companies`, {
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
}
export default registerCompany

