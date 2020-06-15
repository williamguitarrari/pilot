import {
  always, applySpec, ifElse, omit, pipe, prop, propEq,
} from 'ramda'
import moment from 'moment'
import shortid from 'shortid'

const parseIntValue = propName => obj => parseInt(obj[propName], 10)

const expiresIn = ({
  expiration_amount: expirationAmount,
  expiration_unit: expirationUnit,
}) => {
  const date = moment()
  const expirationDate = date.clone().add(expirationAmount, expirationUnit)
  const duration = moment.duration(expirationDate.diff(date))
  return parseInt(duration.asMinutes(), 10)
}

const buildBoleto = applySpec({
  enabled: prop('boleto'),
  expires_in: parseIntValue('boleto_expires_in'),
})

const paymentMethod = ifElse(
  propEq('credit_card', true),
  always('credit_card'),
  always('boleto')
)

const paymentConfigBoleto = ifElse(
  propEq('boleto', true),
  buildBoleto,
  always(null)
)

const parserInterestRate = obj => parseFloat(obj.interest_rate, 10) || 0.01

const buildCreditCard = applySpec({
  enabled: prop('credit_card'),
  free_installments: parseIntValue('free_installments'),
  interest_rate: parserInterestRate,
  max_installments: parseIntValue('max_installments'),
})

const paymentConfigCreditCard = ifElse(
  propEq('credit_card', true),
  buildCreditCard,
  always(null)
)

const paymentConfig = applySpec({
  boleto: paymentConfigBoleto,
  credit_card: paymentConfigCreditCard,
  default_payment_method: paymentMethod,
})

const omitBoletoOrCreditCard = (values) => {
  const payload = values

  if (!values.boleto) {
    return omit(['boleto'], payload)
  }

  if (!values.credit_card) {
    return omit(['credit_card'], payload)
  }

  return payload
}

const buildItems = obj => [
  {
    id: shortid(),
    quantity: 1,
    tangible: true,
    title: obj.name,
    unit_price: parseIntValue('amount')(obj),
  },
]

export default applySpec({
  amount: parseIntValue('amount'),
  expires_in: expiresIn,
  items: buildItems,
  name: prop('name'),
  payment_config: pipe(paymentConfig, omitBoletoOrCreditCard),
})
