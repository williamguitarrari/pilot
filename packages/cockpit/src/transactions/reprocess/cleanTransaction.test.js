import {
  assoc,
  dissoc,
  pipe,
} from 'ramda'
import cleanTransaction from './cleanTransaction'
import fromRequest from './mocks/fromRequest.json'
import toRequest from './mocks/toRequest.json'

describe('Reprocess', () => {
  it('should work', () => {
    expect(cleanTransaction(fromRequest)).toEqual(toRequest)
  })

  it('should work when customer is null', () => {
    const withoutCustomer = assoc('customer', null, fromRequest)
    const toRequestWithourCustomer = pipe(
      dissoc('customer'),
      dissoc('customer_id')
    )(toRequest)

    expect(cleanTransaction(withoutCustomer)).toEqual(toRequestWithourCustomer)
  })
})
