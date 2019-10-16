import moment from 'moment-timezone'

const forceFormat = true
const isDate = value => moment(value, 'DD/MM/YYYY', forceFormat).isValid()

export default message => value => !isDate(value) && message
