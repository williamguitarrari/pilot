import {
  assoc,
  assocPath,
  pipe,
} from 'ramda'
import moment from 'moment-timezone'

import isReprocessable from './isReprocessable'
import { transaction as transactionMock } from './mocks/fromRequests.json'

const emptyData = []

const now = (new Date()).toISOString()

describe('isReprocessable', () => {
  it('should return false if status is processing', () => {
    const transaction = assoc('status', 'processing', transactionMock)
    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return true if status is refused', () => {
    const transaction = pipe(
      assoc('status', 'refused'),
      assoc('date_created', now)
    )(transactionMock)
    expect(isReprocessable(transaction, emptyData)).toBe(true)
  })

  it('should return false if subscription_id is not null', () => {
    const transaction = pipe(
      assoc('subscription_id', 12345),
      assoc('status', 'refused'),
      assoc('date_created', now)
    )(transactionMock)
    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return true if subscription_id is null', () => {
    const transaction = pipe(
      assoc('subscription_id', null),
      assoc('status', 'refused'),
      assoc('date_created', now)
    )(transactionMock)
    expect(isReprocessable(transaction, emptyData)).toBe(true)
  })

  it('should return false if payment_method is not credit_card', () => {
    const transaction = pipe(
      assoc('payment_method', 'boleto'),
      assoc('status', 'refused'),
      assoc('date_created', now)
    )(transactionMock)
    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return false if status is refused and date_created greater than 5d', () => {
    const transaction = pipe(
      assoc('status', 'refused'),
      assoc('date_created', moment().subtract(6, 'days'))
    )(transactionMock)

    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return true if status is refused and date_created less than 5d', () => {
    const transaction = pipe(
      assoc('status', 'refused'),
      assoc('date_created', now)
    )(transactionMock)

    expect(isReprocessable(transaction, emptyData)).toBe(true)
  })

  it('should return true if status is refused and metadata.pagarme_original_transaction_id is undefined', () => {
    const transaction = pipe(
      assoc('status', 'refused'),
      assoc('date_created', now)
    )(transactionMock)

    expect(isReprocessable(transaction, emptyData)).toBe(true)
  })

  it('should return false if status is refused and metadata.pagarme_original_transaction_id is not undefined', () => {
    const transaction = pipe(
      assoc('status', 'refused'),
      assoc('date_created', now),
      assocPath(['metadata', 'pagarme_original_transaction_id'], 123456)
    )(transactionMock)

    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return false if status is paid and metadata.pagarme_original_transaction_id is undefined', () => {
    const transaction = assoc('status', 'paid', 'transactionMock')

    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return false if status is paid and metadata.pagarme_original_transaction_id is not undefined', () => {
    const transaction = pipe(
      assoc('status', 'paid'),
      assocPath(['metadata', 'pagarme_original_transaction_id'], 123456)
    )(transactionMock)

    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return true if status is refused and data.length === 0', () => {
    const transaction = pipe(
      assoc('status', 'refused'),
      assoc('date_created', now)
    )(transactionMock)
    expect(isReprocessable(transaction, emptyData)).toBe(true)
  })

  it('should return false if status is paid and data.length === 0', () => {
    const transaction = assoc('status', 'paid', transactionMock)
    expect(isReprocessable(transaction, emptyData)).toBe(false)
  })

  it('should return false if status is refused and reprocess.status is paid', () => {
    const transaction = pipe(
      assoc('status', 'refused'),
      assoc('date_created', now)
    )(transactionMock)

    expect(isReprocessable(transaction, { status: 'paid' })).toBe(false)
  })

  it('should return true if status is refused and reprocess.status is refused', () => {
    const transaction = pipe(
      assoc('status', 'refused'),
      assoc('date_created', now)
    )(transactionMock)

    expect(isReprocessable(transaction, { status: 'refused' })).toBe(true)
  })

  it('should return false if transaction is from reprocessement', () => {
    const transaction = pipe(
      assoc('id', 1),
      assoc('status', 'refused'),
      assoc('date_created', now)
    )(transactionMock)

    const reprocessed = {
      status: 'refused',
      original_transaction_id: 123,
    }

    expect(isReprocessable(transaction, reprocessed)).toBe(false)
  })
})
