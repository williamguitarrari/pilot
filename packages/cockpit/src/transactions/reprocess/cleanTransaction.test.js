import cleanTransaction from './cleanTransaction'
import fromRequest from './mocks/fromRequest.json'
import toRequest from './mocks/toRequest.json'

describe('Reprocess', () => {
  it('should work', () => {
    expect(cleanTransaction(fromRequest)).toEqual(toRequest)
  })
})
