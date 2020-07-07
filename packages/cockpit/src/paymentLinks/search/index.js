import buildResult from './result'
import buildQuery from './query'

const search = client => (filter = {}) => {
  const query = buildQuery(filter)
  return client.search({
    type: 'payment_link',
    query: JSON.stringify(query),
  })
    .then(buildResult)
}

export default search
