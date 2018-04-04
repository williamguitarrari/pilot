import isBusinessDay from './isBusinessDay'
import nextAnticipableBusinessDay from './nextAnticipableBusinessDay'
import nextBusinessDay from './nextBusinessDay'
import requestBusinessCalendar from './requestBusinessCalendar'

export {
  isBusinessDay,
  nextAnticipableBusinessDay,
  nextBusinessDay,
  requestBusinessCalendar,
}

const business = () => ({
  isBusinessDay,
  nextAnticipableBusinessDay,
  nextBusinessDay,
  requestBusinessCalendar,
})

export default business
