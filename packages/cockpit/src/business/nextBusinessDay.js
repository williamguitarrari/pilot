import isBusinessDay from './isBusinessDay'

const nextBusinessDay = (calendar = {}, date) => {
  date.add(1, 'days')

  while (!isBusinessDay(calendar, date)) {
    date.add(1, 'days')
  }

  return date
}

export default nextBusinessDay
