import moment from 'moment-timezone'
import {
  anyPass,
  complement,
  pathOr,
} from 'ramda'

const userCreatedLessThan30Days = ({ user }) => {
  const createdAtDaysDiff = moment().diff(user.date_created, 'days')
  return createdAtDaysDiff < 30
}

const companyNotTransacted = complement(pathOr(true, ['company', 'alreadyTransacted']))

const isRecentCreatedUser = anyPass([
  companyNotTransacted,
  userCreatedLessThan30Days,
])

export default isRecentCreatedUser
