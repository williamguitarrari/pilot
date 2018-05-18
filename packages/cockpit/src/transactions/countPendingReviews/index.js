import query from './query'
import buildResult from './result'

const pendingReviews = client => () =>
  client.search({
    query: JSON.stringify(query),
    search_type: 'count',
    type: 'transaction',
  })
    .then(buildResult)

export default pendingReviews
