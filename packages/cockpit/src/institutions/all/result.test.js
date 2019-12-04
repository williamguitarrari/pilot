import buildResult from './result'
import fromRequest from './mocks/received.json'
import expectedResult from './mocks/expected.json'

describe('institutions', () => {
  it('should build the correct institutions object format', () => {
    const result = buildResult(fromRequest)

    expect(result).toEqual(expectedResult)
  })
})
