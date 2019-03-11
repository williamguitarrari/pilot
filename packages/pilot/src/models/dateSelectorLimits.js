import moment from 'moment'

export default {
  lower: moment('01-01-2013', 'L'),
  upper: moment().add(10, 'year'),
}
