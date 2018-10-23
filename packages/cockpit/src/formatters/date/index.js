import moment from 'moment'
import {
  isNil,
  join,
  pipe,
  reverse,
  split,
  unless,
} from 'ramda'

const formatDate = date => moment(date).format('x')

const getTimestampFromDate = pipe(unless(
  isNil,
  pipe(
    split('/'),
    reverse,
    join('-'),
    formatDate,
    Number
  )
))

export default getTimestampFromDate
