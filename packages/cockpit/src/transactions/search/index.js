import buildQuery from './query'
import buildResult from './result'

const search = client => (clientFilter) => {
  const filter = clientFilter || {}
  const query = buildQuery(filter)

  return client.search({
    type: 'transaction',
    query: JSON.stringify(query),
  })
    .then(buildResult(filter))
}

export default search
