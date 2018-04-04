import { find, propEq } from 'ramda'

const isWeekend = date => date.isoWeekday() === 6 || date.isoWeekday() === 7

const getCalendarDate = (calendar, date) => {
  const key = date.format('YYYY-MM-DD')

  return find(propEq('date', key), calendar.calendar)
}

export {
  getCalendarDate,
  isWeekend,
}
