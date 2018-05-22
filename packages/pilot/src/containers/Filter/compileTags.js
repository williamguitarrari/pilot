import {
  eqBy,
  innerJoin,
  map,
  objOf,
  prop,
} from 'ramda'

const compileTags = (options, values = {}) =>
  map(
    ({ key, items, name }) => ({
      key,
      name,
      items: map(
        prop('label'),
        innerJoin(
          eqBy(prop('value')),
          items,
          map(objOf('value'), values[key] || [])
        )
      ),
    }),
    options
  )

export default compileTags
