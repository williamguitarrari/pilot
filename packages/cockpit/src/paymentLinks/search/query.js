import {
  applySpec,
  complement,
  defaultTo,
  isEmpty,
  pipe,
  prop,
} from 'ramda'

const defaultSize = defaultTo(15)
const isNotEmpty = complement(isEmpty)

const buildFrom = ({ count, page }) => {
  if (page < 1) return count

  return count * (page - 1)
}

const buildSort = ({ sortField, sortOrder }) => {
  const parsedOrder = sortOrder === 'descending'
    ? 'desc'
    : 'asc'

  return [{ [sortField]: parsedOrder }]
}


const buildDateCreatedFilter = ({ dates }) => ({
  range: {
    date_created: {
      gte: dates.start.toISOString(),
      lte: dates.end.toISOString(),
    },
  },
})

const buildStatusTerms = ({ active, inactive }) => {
  const statusTerms = []
  if (active) statusTerms.push('active')
  if (inactive) statusTerms.push('canceled', 'expired')

  return {
    terms: {
      status: statusTerms,
    },
  }
}

const buildQuery = (data) => {
  const query = {
    bool: {
      must: [
        buildDateCreatedFilter(data),
        buildStatusTerms(data),
      ],
    },
  }

  const parsedName = data.name.trim()
  if (parsedName) {
    const wildCardQueries = parsedName
      .split(' ')
      .filter(isNotEmpty)
      .map(item => ({
        wildcard: {
          name: `*${item}*`,
        },
      }))

    query.bool.must.push(...wildCardQueries)
  }

  return query
}

export default applySpec({
  from: buildFrom,
  size: pipe(prop('count'), defaultSize),
  sort: buildSort,
  query: buildQuery,
})
