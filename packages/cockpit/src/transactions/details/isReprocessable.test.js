import {
  assoc,
  assocPath,
  merge,
  of,
  pipe,
} from 'ramda'
import isReprocessable from './isReprocessable'
import { transaction as transactionMock } from './mocks/fromRequests.json'

const dataWithMetadata = pipe(
  assocPath(
    ['metadata', 'pagarme_original_transaction_id'],
    123456789
  ),
  of
)(transactionMock)
const emptyData = []

const now = (new Date()).toISOString()

describe('isReprocessable', () => {
  it('should return false if status is processing', () => {
    const transaction = assoc('status', 'processing', transactionMock)
    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return true if status is refused', () => {
    const transaction = merge(transactionMock, {
      date_created: now,
      status: 'refused',
    })
    expect(isReprocessable(transaction, emptyData)).toBe(true)
  })

  it('should return false if subscription_id is not null', () => {
    const transaction = merge(transactionMock, {
      date_created: now,
      status: 'refused',
      subscription_id: 12345,
    })
    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return true if subscription_id is null', () => {
    const transaction = merge(transactionMock, {
      date_created: now,
      status: 'refused',
      subscription_id: null,
    })
    expect(isReprocessable(transaction, emptyData)).toBe(true)
  })

  it('should return false if payment_method is not credit_card', () => {
    const transaction = merge(transactionMock, {
      date_created: now,
      payment_method: 'boleto',
      status: 'refused',
    })
    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return false if status is refused and date_created greater than 24h', () => {
    const transaction = assoc('status', 'refused', transactionMock)
    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return true if status is refused and date_created less than 24h', () => {
    const transaction = merge(transactionMock, {
      date_created: now,
      status: 'refused',
    })
    expect(isReprocessable(transaction, emptyData)).toBe(true)
  })

  it('should return true if status is refused and metadata.pagarme_original_transaction_id is undefined', () => {
    const transaction = merge(transactionMock, {
      date_created: now,
      status: 'refused',
    })

    expect(isReprocessable(transaction, emptyData)).toBe(true)
  })

  it('should return false if status is refused and metadata.pagarme_original_transaction_id is not undefined', () => {
    const transaction = (transactionMock, {
      date_created: now,
      metadata: {
        pagarme_original_transaction_id: 123456,
      },
      status: 'refused',
    })

    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return false if status is paid and metadata.pagarme_original_transaction_id is undefined', () => {
    const transaction = assoc('status', 'paid', 'transactionMock')

    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return false if status is paid and metadata.pagarme_original_transaction_id is not undefined', () => {
    const transaction = merge(transactionMock, {
      metadata: {
        pagarme_original_transaction_id: 123456,
      },
      status: 'paid',
    })

    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return true if status is refused and data.length === 0', () => {
    const transaction = merge(transactionMock, {
      date_created: now,
      status: 'refused',
    })
    expect(isReprocessable(transaction, emptyData)).toBe(true)
  })

  it('should return false if status is refused and data.length !== 0', () => {
    const transaction = merge(transactionMock, {
      date_created: now,
      status: 'refused',
    })
    expect(isReprocessable(transaction, dataWithMetadata)).toBe(false)
  })

  it('should return false if status is paid and data.length === 0', () => {
    const transaction = assoc('status', 'paid', transactionMock)
    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return false if status is paid and data.length !== 0', () => {
    const transaction = assoc('status', 'paid', transactionMock)
    expect(isReprocessable(transaction, dataWithMetadata)).toBe(false)
  })
})
