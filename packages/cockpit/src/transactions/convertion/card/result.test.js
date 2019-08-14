import buildResult from './result'

import fromRequest from './mocks/fromRequest.json'
import expectedResult from './mocks/expectedResult.json'

describe('Transactions Card Convertion', () => {
  it('should build result as expected', () => {
    const result = buildResult(fromRequest)
    expect(result).toEqual(expectedResult)
  })
})
