import query from './query'
import buildResult from './result'

const card = (client, rangeDates) => client.search({
  query: JSON.stringify(query(rangeDates)),
  type: 'transaction',
  search_type: 'count',
})
  .then(buildResult)

export default card
