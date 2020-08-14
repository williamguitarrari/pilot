import moment from 'moment-timezone'
import {
  allPass,
  complement,
  pathOr,
} from 'ramda'

const userCreatedLessThan30DaysAgo = ({ company }) => {
  const createdAtDaysDiff = moment().diff(company.date_created, 'days')
  return createdAtDaysDiff < 30
}

const companyNotTransacted = complement(pathOr(true, ['company', 'alreadyTransacted']))

const isRecentlyCreatedCompany = allPass([
  companyNotTransacted,
  userCreatedLessThan30DaysAgo,
])

export default isRecentlyCreatedCompany
