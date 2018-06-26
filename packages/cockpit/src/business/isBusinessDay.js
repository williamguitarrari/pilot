import {
  getCalendarDate,
  isWeekend,
} from './shared'

const isBusinessDay = (calendar = {}, date) => {
  if (isWeekend(date)) {
    return false
  }

  const day = getCalendarDate(calendar, date)

  if (!day) {
    return true
  }

  return !day.holiday && !day.limited_financial_operation
}

export default isBusinessDay
