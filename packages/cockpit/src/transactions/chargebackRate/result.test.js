import buildResult from './result'

import fromRequest from './mocks/fromRequest.json'
import expectedResult from './mocks/expectedResult.json'

describe('Metrics - Chargeback', () => {
  it('should build the expected result', () => {
    const result = buildResult(fromRequest)

    expect(result).toEqual(expectedResult)
  })
})
