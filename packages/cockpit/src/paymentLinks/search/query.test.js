import buildQuery from './query'

describe('PaymentLinks Query', () => {
  it('should construct the correct query', () => {
    const rawFilter = {
      count: 50,
      page: 5,
    }

    const query = buildQuery(rawFilter)
    expect(query).toEqual({ from: 250, size: 50 })
  })
})
