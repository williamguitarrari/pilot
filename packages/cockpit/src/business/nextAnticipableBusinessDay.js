import nextBusinessDay from './nextBusinessDay'

const nextAnticipableBusinessDay = (calendar, cutTime, date) => {
  const cutDate = date.clone().set(cutTime)

  if (date.isAfter(cutDate)) {
    return nextBusinessDay(calendar, date)
  }

  return date
}

export default nextAnticipableBusinessDay
