import moment from 'moment'
import {
  applySpec,
  isNil,
  map,
  pipe,
  propOr,
  unless,
} from 'ramda'

const formarDate = date => moment(date).format('DD/MM/YYYY')

const formatUser = applySpec({
  id: propOr('', 'id'),
  email: propOr('', 'email'),
  name: propOr('', 'name'),
  role: propOr('', 'permission'),
  date_created: pipe(
    propOr(null, 'date_created'),
    unless(isNil, formarDate)
  ),
})

export default pipe(
  propOr([], 'users'),
  map(formatUser)
)
