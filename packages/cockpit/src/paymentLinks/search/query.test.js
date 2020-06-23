import buildQuery from './query'

describe('PaymentLinks Query', () => {
  it('should construct the correct query', () => {
    const rawFilter = {
      count: 50,
      page: 5,
      sortField: 'created_at',
    }

    const query = buildQuery(rawFilter)
    expect(query).toEqual({
      from: 200,
      size: 50,
      sort: [{
        created_at: 'asc',
      }],
    })
  })
})
