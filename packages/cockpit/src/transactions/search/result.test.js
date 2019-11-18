import buildResult from './result'
import requestResultMock from './mocks/fromRequest.json'
import {
  query,
  transactions,
} from './mocks/expectedResult'

const buildResultToDashboard = buildResult(query)

describe('Transactions to dashboard', () => {
  it('should work when transactions are returned', () => {
    const result = buildResultToDashboard(requestResultMock)

    expect(result).toBeJsonEqual({
      query,
      ...transactions,
    })
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

    const result = buildResultToDashboard(apiMock)

    const expectedResult = {
      query,
      result: {
        chart: {
          dataset: [],
        },
        list: {
          offset: query.offset,
          count: 0,
          rows: [],
        },
        total: {
          count: 0,
          payment: {
            net_amount: 0,
            paid_amount: 0,
          },
        },
      },
    }
    expect(result).toBeJsonEqual(expectedResult)
  })
})
