import moment from 'moment'

export const isValidDay = timeframe => (date) => {
  const today = moment()
  if (timeframe === 'future') {
    return moment(date).isSameOrAfter(today, 'day')
  }
  return moment(date).isSameOrBefore(today, 'day')
}

export default {
  lower: moment('01-01-2013', 'L'),
  upper: moment().add(10, 'year'),
}
