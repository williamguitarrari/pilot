import {
  assoc,
  pipe,
} from 'ramda'
import moment from 'moment'

import isCapturable from './isCapturable'
import { transaction as transactionMock } from './mocks/fromRequests.json'

describe('isCapturable', () => {
  it('should return false if status is not authorized', () => {
    const authorized = assoc('status', 'authorized', transactionMock)
    const processing = assoc('status', 'processing', transactionMock)
    const waitingPayment = assoc('status', 'waiting_payment', transactionMock)
    const refused = assoc('status', 'refused', transactionMock)
    const paid = assoc('status', 'paid', transactionMock)

    expect(isCapturable(authorized)).toBe(true)
    expect(isCapturable(processing)).toBe(false)
    expect(isCapturable(waitingPayment)).toBe(false)
    expect(isCapturable(refused)).toBe(false)
    expect(isCapturable(paid)).toBe(false)
  })

  it('should return true if status is authorized', () => {
    const transaction = assoc('status', 'authorized', transactionMock)
    expect(isCapturable(transaction)).toBe(true)
  })

  it('should return true if authorized with encryption key and valid token', () => {
    const transaction = pipe(
      assoc('status', 'authorized'),
      assoc('referer', 'encryption_key'),
      assoc('date_created', moment().subtract(4, 'hours').toDate())
    )(transactionMock)

    expect(isCapturable(transaction)).toBe(true)
  })

  it('should return false if authorized with encryption key and invalid token', () => {
    const transaction = pipe(
      assoc('status', 'authorized'),
      assoc('referer', 'encryption_key'),
      assoc('date_created', moment().subtract(5, 'hours').toDate())
    )(transactionMock)

    expect(isCapturable(transaction)).toBe(false)
  })
})
