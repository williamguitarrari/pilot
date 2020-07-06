import moment from 'moment-timezone'
import buildQuery from './query'

describe('PaymentLinks Query', () => {
  it('should construct the correct query', () => {
    const start = moment().subtract(1, 'month')
    const end = moment()

    const rawFilter = {
      count: 50,
      page: 5,
      sortField: 'date_created',
      name: 'Indiana Jones ',
      active: true,
      inactive: false,
      dates: { start, end },
    }

    const query = buildQuery(rawFilter)
    expect(query).toEqual({
      from: 200,
      size: 50,
      sort: [{
        date_created: 'asc',
      }],
      query: {
        bool: {
          must: [
            {
              range: {
                date_created: {
                  gte: start.toISOString(),
                  lte: end.toISOString(),
                },
              },
            },
            { terms: { status: ['active'] } },
            {
              wildcard: { name: '*Indiana*' },
            },
            {
              wildcard: { name: '*Jones*' },
            },
          ],
        },
      },
    })
  })
})
