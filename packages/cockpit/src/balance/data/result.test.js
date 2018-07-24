import buildResult from './result'
import fromRequest from '../mocks/dataFromRequestsMock.json'
import expectedResult from '../mocks/dataExpectedResult.json'

const dates = {
  start_date: 1523636040890,
  end_date: 1523636050890,
}

describe('balance data details', () => {
  it('should build the correct balance data', () => {
    const result = buildResult({
      count: 2,
      page: 3,
      start_date: dates.start_date,
      end_date: dates.end_date,
    })
    expect(result(fromRequest)).toEqual(expectedResult)
  })
})
