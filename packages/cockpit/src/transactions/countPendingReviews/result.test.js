import buildResult from './result'

const mockResponse = {
  _shards: {
    failed: 0,
    successful: 5,
    total: 5,
  },
  hits: {
    hits: [],
    max_score: 0,
    total: 3,
  },
  timed_out: false,
  took: 3,
}

describe('Transactions count pending reviews', () => {
  it('should build result', () => {
    const result = buildResult(mockResponse)
    expect(result).toEqual({ count: 3 })
  })
})
