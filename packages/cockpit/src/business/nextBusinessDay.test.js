import moment from 'moment'
import nextBusinessDay from './nextBusinessDay'
import mock from './mocks/brazil2016.json'

describe('nextBusinessDay', () => {
  it('should return the correct day', () => {
    const day = moment('2016-2-5', 'YYYY-MM-DD')
    const expextedDay = moment('2016-2-10', 'YYYY-MM-DD')

    expect(nextBusinessDay(mock, day).toISOString())
      .toBe(expextedDay.toISOString())
  })
})
