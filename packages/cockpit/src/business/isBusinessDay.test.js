import moment from 'moment'
import isBusinessDay from './isBusinessDay'
import mock from './mocks/brazil2016.json'

describe('isBusinessDay', () => {
  it('should return false on saturday', () => {
    expect(isBusinessDay(mock, moment('2016-02-06'))).toBe(false)
  })

  it('should return false on sunday', () => {
    expect(isBusinessDay(mock, moment('2016-02-07'))).toBe(false)
  })

  it('should return false on holidays', () => {
    expect(isBusinessDay(mock, moment('2016-02-08'))).toBe(false)
  })

  it('should return false on days with partial financial operation', () => {
    expect(isBusinessDay(mock, moment('2016-12-24'))).toBe(false)
  })

  it('should return true when the day is a business day', () => {
    expect(isBusinessDay(mock, moment('2016-02-10'))).toBe(true)
  })
})
