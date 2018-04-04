import moment from 'moment'
import nextAnticipableBusinessDay from './nextAnticipableBusinessDay'
import mock from './mocks/brazil2016.json'

describe('nextAnticipableBusinessDay', () => {
  it('should return same day', () => {
    const day = moment('2016-05-03T09:10:01Z')
    const nextDay = nextAnticipableBusinessDay(
      mock,
      { hour: 10, minute: 20 },
      day
    )
    expect(nextDay).toBe(day)
  })

  it('should return next day', () => {
    const day = moment('2016-05-03T11:40:01Z')
    const nextDay = nextAnticipableBusinessDay(
      mock,
      { hour: 10, minute: 20 },
      day
    )
    expect(nextDay).toBe(day.add(1, 'days'))
  })
})
