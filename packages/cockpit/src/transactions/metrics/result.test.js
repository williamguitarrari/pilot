import buildResult from './result'

import fromRequest from './mocks/fromRequest.json'
import expectedResult from './mocks/expectedResult.json'

describe('Transactions metrics', () => {
  it('should build result as expected', () => {
    const result = buildResult(fromRequest)

    expect(result).toEqual(expectedResult)
  })
})
