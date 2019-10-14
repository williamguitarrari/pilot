import { formatReprocessedTransaction } from './reprocessedTransactions'

import {
  transaction,
  reprocessedTransaction,
} from './mocks/fromReprocessing.json'

import expectedReprocessing from './mocks/expectedReprocessing.json'

describe('reprocessedTransactions', () => {
  it('should return expected payload from transactions', () => {
    const result = formatReprocessedTransaction(transaction)
    expect(result).toEqual(expectedReprocessing)
  })

  it('should return expected payload from reprocessings', () => {
    const result = formatReprocessedTransaction(reprocessedTransaction)
    expect(result).toEqual(expectedReprocessing)
  })
})
