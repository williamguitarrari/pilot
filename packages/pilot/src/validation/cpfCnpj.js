import {
  CPF,
  CNPJ,
} from 'cpf_cnpj'

export default message => value => (
  CPF.isValid(value) || CNPJ.isValid(value)
    ? false
    : message
)
