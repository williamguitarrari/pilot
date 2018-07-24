import buildBalanceTotal from './result'
import fromRequest from '../mocks/totalFromRequestsMock.json'
import expectedResult from '../mocks/totalExpectedResult.json'

describe('balance total details', () => {
  it('should build the correct total balance', () => {
    expect(buildBalanceTotal(fromRequest)).toEqual(expectedResult)
  })
})
