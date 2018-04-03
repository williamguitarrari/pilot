import {
  lensProp,
  map,
  over,
} from 'ramda'

const titleLens = lensProp('title')

/**
 *
 * @param {Object} translate => translate object with all translated titles
 */
const getFormater = translate => map(over(titleLens, translate))

export default getFormater
