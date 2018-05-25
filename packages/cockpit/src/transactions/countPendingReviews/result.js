import { applySpec, path } from 'ramda'

const buildResult = applySpec({
  count: path(['hits', 'total']),
})

export default buildResult

