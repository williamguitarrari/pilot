import {
  applySpec,
  pipe,
  propOr,
} from 'ramda'

const formatAddress = applySpec({
  street: propOr('', 'street'),
  complementary: propOr('', 'complementary'),
  streetNumber: propOr('', 'street_number'),
  neighborhood: propOr('', 'neighborhood'),
  city: propOr('', 'city'),
  state: propOr('', 'state'),
  zipcode: propOr('', 'zipcode'),
})

export default pipe(
  propOr({}, 'address'),
  formatAddress
)

