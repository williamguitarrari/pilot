import {
  assocPath,
  assoc,
  dissocPath,
  pipe,
  drop,
  path,
} from 'ramda'
import buildQuery from './query'

const defaultFrom = 0
const defaultSize = 15

const mockDates = {
  start: new Date(),
  end: new Date(),
}

const aggregations = {
  total_amount: {
    filter: {
      term: {
        status: 'paid',
      },
    },
    aggregations: {
      amount: {
        sum: {
          field: 'amount',
        },
      },
    },
  },
  total_cost: {
    sum: {
      field: 'cost',
    },
  },
  total_per_day: {
    date_histogram: {
      field: 'date_created',
      interval: 'day',
      format: 'MM/dd/yyyy',
    },
    aggregations: {
      per_status: {
        terms: {
          field: 'status',
        },
        aggregations: {
          amount: {
            sum: {
              field: 'amount',
            },
          },
        },
      },
    },
  },
}

const dashboard = {
  search: '12345',
  dates: mockDates,
  filters: {
    payment_method: ['credit_card', 'debit_card'],
    status: ['paid'],
  },
  offset: 2,
  count: 20,
  sort: {
    field: ['customer', 'document_number'],
    order: 'ascending',
  },
}

const expectedQuery = {
  from: 20,
  aggregations,
  sort: {},
  query: {
    filtered: {
      filter: {
        and: [
          {
            terms: {
              payment_method: ['credit_card', 'debit_card'],
            },
          },
          {
            terms: {
              status: ['paid'],
            },
          },
          {
            or: [
              {
                term: {
                  id: 12345,
                },
              },
              {
                term: {
                  'customer.documents.number': '12345',
                },
              },
              {
                term: {
                  'customer.document_number': '12345',
                },
              },
              {
                term: {
                  'customer.email': '12345',
                },
              },
              {
                term: {
                  'customer.name': '12345',
                },
              },
            ],
          },
          {
            range: {
              date_created: {
                gte: mockDates.start.toISOString(),
                lte: mockDates.end.toISOString(),
              },
            },
          },
        ],
      },
      query: {
        match_all: {

        },
      },
    },
  },
  size: 20,
}

describe('Transactions from filter', () => {
  it('should transform the received query correctly', () => {
    const query = buildQuery(dashboard)
    const sort = [{
      'customer.document_number': {
        order: 'asc',
      },
    }]
    const expected = assoc('sort', sort, expectedQuery)

    expect(query).toEqual(expected)
  })

  it('should work with only search field value', () => {
    const {
      dates,
      filters: fake,
      sort,
      ...searchFilters
    } = dashboard
    const query = buildQuery(searchFilters)
    const expectedSearchQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          or: [
            {
              term: {
                id: 12345,
              },
            },
            {
              term: {
                'customer.documents.number': '12345',
              },
            },
            {
              term: {
                'customer.document_number': '12345',
              },
            },
            {
              term: {
                'customer.email': '12345',
              },
            },
            {
              term: {
                'customer.name': '12345',
              },
            },
          ],
        },
      ],
      expectedQuery
    )

    expect(query).toEqual(expectedSearchQuery)
  })

  it('should work with only dates values', () => {
    const datesFilters = {
      dates: mockDates,
      filters: null,
      offset: 2,
      count: 20,
      search: null,
    }
    const query = buildQuery(datesFilters)
    const expectedDatesQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          range: {
            date_created: {
              gte: mockDates.start.toISOString(),
              lte: mockDates.end.toISOString(),
            },
          },
        },
      ],
      expectedQuery
    )

    expect(query).toEqual(expectedDatesQuery)
  })

  it('should work with only start date', () => {
    const datesFilters = {
      dates: { start: mockDates.start },
      filters: null,
      offset: 2,
      count: 20,
      search: null,
    }
    const query = buildQuery(datesFilters)
    const expectedDatesQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          range: {
            date_created: {
              gte: mockDates.start.toISOString(),
            },
          },
        },
      ],
      expectedQuery
    )

    expect(query).toEqual(expectedDatesQuery)
  })

  it('should work with only end date', () => {
    const datesFilters = {
      dates: { end: mockDates.end },
      filters: null,
      offset: 2,
      count: 20,
      search: null,
    }
    const query = buildQuery(datesFilters)
    const expectedDatesQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          range: {
            date_created: {
              lte: mockDates.end.toISOString(),
            },
          },
        },
      ],
      expectedQuery
    )

    expect(query).toEqual(expectedDatesQuery)
  })

  it('should work with only selected filters', () => {
    const selectedFilters = {
      dates: null,
      filters: dashboard.filters,
      offset: 2,
      count: 20,
      search: null,
    }
    const query = buildQuery(selectedFilters)
    const expectedFiltersQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          terms: {
            payment_method: ['credit_card', 'debit_card'],
          },
        },
        {
          terms: {
            status: ['paid'],
          },
        },
      ],
      expectedQuery
    )

    expect(query).toEqual(expectedFiltersQuery)
  })

  it('should work without offset and count', () => {
    const query = buildQuery({
      search: '',
    })
    const expectedFilterQuery = dissocPath(
      ['query', 'filtered', 'filter'],
      expectedQuery
    )
    const expectedFinalQuery = {
      ...expectedFilterQuery,
      from: defaultFrom,
      size: defaultSize,
    }

    expect(query).toEqual(expectedFinalQuery)
  })

  it('should work without count', () => {
    const query = buildQuery({
      search: '',
      offset: 2,
    })
    const filterQuery = dissocPath(
      ['query', 'filtered', 'filter'],
      expectedQuery
    )
    const expectedFinalQuery = {
      ...filterQuery,
      size: defaultSize,
      from: 15,
    }

    expect(query).toEqual(expectedFinalQuery)
  })

  it('should work without offset', () => {
    const query = buildQuery({
      search: '',
      count: 20,
    })
    const filterQuery = dissocPath(
      ['query', 'filtered', 'filter'],
      expectedQuery
    )
    const expectedFinalQuery = {
      ...filterQuery,
      from: defaultFrom,
    }

    expect(query).toEqual(expectedFinalQuery)
  })

  it('should ignore search if search is not a string', () => {
    const query = buildQuery({
      search: {},
      offset: 2,
      count: 20,
    })
    const expectedSearchQuery = dissocPath(
      ['query', 'filtered', 'filter'],
      expectedQuery
    )

    expect(query).toEqual(expectedSearchQuery)
  })

  it('should ignore dates if dates is not an object', () => {
    const expectedSearchQuery = dissocPath(
      ['query', 'filtered', 'filter'],
      expectedQuery
    )
    const query = buildQuery({
      dates: '',
      offset: 2,
      count: 20,
    })

    expect(query).toEqual(expectedSearchQuery)
  })

  it('should ignore empty dates', () => {
    const expectedSearchQuery = dissocPath(
      ['query', 'filtered', 'filter'],
      expectedQuery
    )
    const query = buildQuery({
      dates: undefined,
      offset: 2,
      count: 20,
    })

    expect(query).toEqual(expectedSearchQuery)
  })

  it('should ignore prop filters if it is empty', () => {
    const newFilters = assoc('filters', {}, dashboard)
    const andPath = path(['query', 'filtered', 'filter', 'and'], expectedQuery)
    const expectedAnd = pipe(
      drop(1),
      drop(1)
    )
    const query = buildQuery(assoc('sort', null, newFilters))
    const expectedFiltersQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      expectedAnd(andPath),
      expectedQuery
    )

    expect(query).toEqual(expectedFiltersQuery)
  })

  it('should do default query if object is empty', () => {
    const expectedFilterQuery = dissocPath(
      ['query', 'filtered', 'filter'],
      expectedQuery
    )
    const query = buildQuery({})
    const expectedFinalQuery = {
      ...expectedFilterQuery,
      size: defaultSize,
      from: defaultFrom,
    }

    expect(query).toEqual(expectedFinalQuery)
  })

  it('should filter only international credit cards', () => {
    const expectedFilterQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          terms: {
            payment_method: ['credit_card'],
          },
        },
        {
          not: {
            term: {
              'card.country': 'brazil',
            },
          },
        },
      ],
      expectedQuery
    )
    const query = buildQuery({
      filters: {
        payment_method: ['credit_card', 'international_credit_card'],
      },
    })
    const expectedFinalQuery = {
      ...expectedFilterQuery,
      size: defaultSize,
      from: defaultFrom,
    }

    expect(query).toEqual(expectedFinalQuery)
  })

  it('should filter international credit cards, debit cards and boleto', () => {
    const expectedFilterQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          or: [
            {
              terms: {
                payment_method: ['debit_card', 'boleto'],
              },
            },
            {
              and: [
                {
                  terms: {
                    payment_method: ['credit_card'],
                  },
                },
                {
                  not: {
                    term: {
                      'card.country': 'brazil',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      expectedQuery
    )
    const query = buildQuery({
      filters: {
        payment_method: ['credit_card', 'debit_card', 'boleto', 'international_credit_card'],
      },
    })
    const expectedFinalQuery = {
      ...expectedFilterQuery,
      size: defaultSize,
      from: defaultFrom,
    }

    expect(query).toEqual(expectedFinalQuery)
  })

  it('should order by payment_method', () => {
    const defaultSort = [
      {
        payment_method: { order: 'desc' },
      },
    ]
    const expectedFilterQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          terms: {
            payment_method: ['credit_card'],
          },
        },
        {
          not: {
            term: {
              'card.country': 'brazil',
            },
          },
        },
      ],
      expectedQuery
    )
    const query = buildQuery({
      filters: {
        payment_method: ['credit_card', 'international_credit_card'],
      },
      sort: {
        field: ['payment', 'method'],
        order: 'descending',
      },
    })
    const expectedFinalQuery = {
      ...expectedFilterQuery,
      size: defaultSize,
      from: defaultFrom,
      sort: defaultSort,
    }

    expect(query).toEqual(expectedFinalQuery)
  })

  it('should ignore terms.id if search is not a number', () => {
    const dashQuery = {
      search: 'aaaa',
      offset: 2,
      count: 20,
    }

    const query = buildQuery(dashQuery)

    const finalExpectedQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          or: [
            {
              term: {
                'customer.documents.number': 'aaaa',
              },
            },
            {
              term: {
                'customer.document_number': 'aaaa',
              },
            },
            {
              term: {
                'customer.email': 'aaaa',
              },
            },
            {
              term: {
                'customer.name': 'aaaa',
              },
            },

          ],
        },
      ],
      { sort: {}, ...expectedQuery }
    )

    expect(query).toEqual(finalExpectedQuery)
  })

  it('should transform sort object correctly', () => {
    const sort = {
      field: ['card', 'number'],
      order: 'descending',
    }
    const expectedSort = [{
      card_number: {
        order: 'desc',
      },
    }]
    const searchFilters = assoc(
      'sort',
      sort,
      dashboard
    )
    const query = buildQuery(searchFilters)
    const expectedSearchQuery = assoc(
      'sort',
      expectedSort,
      expectedQuery
    )

    expect(query).toEqual(expectedSearchQuery)
  })

  it('should ignore empty filter array', () => {
    const dashQuery = {
      filters: {
        payment_method: [],
        status: ['paid'],
      },
      offset: 2,
      count: 20,
    }

    const finalExpectedQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          terms: {
            status: ['paid'],
          },
        },
      ],
      expectedQuery
    )

    expect(buildQuery(dashQuery)).toEqual(finalExpectedQuery)
  })

  it('should ignore dates when when start and end dates are null', () => {
    const dashQuery = {
      dates: {
        start: null,
        end: null,
      },
      offset: 2,
      count: 20,
    }

    const finalExpectedQuery = dissocPath(
      ['query', 'filtered', 'filter'],
      expectedQuery
    )

    expect(buildQuery(dashQuery)).toEqual(finalExpectedQuery)
  })

  it('should ignore start date if it is null', () => {
    const dashQuery = {
      dates: {
        start: null,
        end: mockDates.end,
      },
      offset: 2,
      count: 20,
    }

    const finalExpectedQuery = assocPath(
      ['query', 'filtered', 'filter', 'and'],
      [
        {
          range: {
            date_created: {
              lte: mockDates.end.toISOString(),
            },
          },
        },
      ],
      expectedQuery
    )

    expect(buildQuery(dashQuery)).toEqual(finalExpectedQuery)
  })

  it('should ignore filters if `and` is empty', () => {
    const dashQuery = {
      offset: 2,
      count: 20,
    }

    const finalExpectedQuery = dissocPath(
      ['query', 'filtered', 'filter'],
      expectedQuery
    )

    expect(buildQuery(dashQuery)).toEqual(finalExpectedQuery)
  })

  it('should have empty object as sort if it is empty', () => {
    const dashQuery = {
      sort: {},
      offset: 2,
      count: 20,
    }

    const getExpectedFinalQuery = pipe(
      dissocPath(['query', 'filtered', 'filter']),
      assoc('sort', {})
    )

    expect(buildQuery(dashQuery)).toEqual(getExpectedFinalQuery(expectedQuery))
  })

  it('should send empty sort if any of its properties is null', () => {
    const dashQueryOrderNull = {
      sort: {
        order: null,
      },
      offset: 2,
      count: 20,
    }

    const dashQueryFieldNull = {
      sort: {
        field: null,
      },
      offset: 2,
      count: 20,
    }

    const getExpectedFinalQuery = pipe(
      dissocPath(['query', 'filtered', 'filter']),
      assoc('sort', {})
    )

    const expectedFinalQuery = getExpectedFinalQuery(expectedQuery)

    expect(buildQuery(dashQueryOrderNull)).toEqual(expectedFinalQuery)
    expect(buildQuery(dashQueryFieldNull)).toEqual(expectedFinalQuery)
  })
})
