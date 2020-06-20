import buildResult from './result'
import requestResultMock from './mocks/fromRequest.json'
import expectedResultMock from './mocks/expectedResult'

describe('PaymentLinks Results', () => {
  it('should work when payment_links are returned', () => {
    const result = buildResult(requestResultMock)

    expect(result).toEqual(expectedResultMock)
  })

  it('should work when hits is empty', () => {
    const apiMock = {
      took: 2,
      timed_out: false,
      _shards: {
        total: 5,
        successful: 5,
        failed: 0,
      },
      hits: {
        total: 0,
        max_score: null,
        hits: [],
      },
    }

    const result = buildResult(apiMock)
    expect(result).toEqual({ total: 0, rows: [] })
  })
})
