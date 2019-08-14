import boleto from './boleto'
import card from './card'

import buildResult from './result'

const exportConvertion = client => rangeDates => Promise.all([
  card(client, rangeDates),
  boleto(client, rangeDates),
])
  .then(buildResult)

export default exportConvertion
