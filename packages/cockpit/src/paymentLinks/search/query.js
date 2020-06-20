import { applySpec, defaultTo, pipe, prop } from 'ramda'

const defaultSize = defaultTo(15)

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

const buildQuery = applySpec({
  from: buildFrom,
  size: pipe(prop('count'), defaultSize),
  sort: buildSort,
})

export default buildQuery
