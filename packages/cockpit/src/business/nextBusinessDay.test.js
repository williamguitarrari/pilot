import moment from 'moment'
import nextBusinessDay from './nextBusinessDay'
import mock from './mocks/brazil2016.json'

describe('nextBusinessDay', () => {
  it('should return the correct day', () => {
    const day = new Date(2016, 1, 5)
    const expextedDay = new Date(2016, 1, 10)

    expect(nextBusinessDay(mock, moment(day)).toISOString())
      .toBe(moment(expextedDay).toISOString())
  })
})
