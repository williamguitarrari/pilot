import moment from 'moment'
import getTimestampFromDate from './index'

describe('Date Formatter', () => {
  const date = '01/02/1975'
  const formattedDate = '1975-02-01'

  const expectedResult = Number(moment(formattedDate).format('x'))
  const result = getTimestampFromDate(date)

  it('should get a timestamp from a given date', () => {
    expect(result).toEqual(expectedResult)
  })
})
