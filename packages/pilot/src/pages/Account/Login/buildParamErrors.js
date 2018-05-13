import {
  apply,
  isNil,
  map,
  mergeAll,
  objOf,
  path,
  pipe,
  props,
  unless,
} from 'ramda'

const buildParamErrors = unless(
  pipe(
    path(['response', 'errors']),
    isNil
  ),
  pipe(
    path(['response', 'errors']),
    map(pipe(
      props(['parameter_name', 'message']),
      apply(objOf)
    )),
    mergeAll
  )
)

export default buildParamErrors
