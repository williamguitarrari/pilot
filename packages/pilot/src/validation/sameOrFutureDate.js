import moment from 'moment'

export default (message, { format = 'DD/MM/YYYY', period = 'day' }) => date =>
  !moment(date, format).isSameOrAfter(moment(), period) && message
