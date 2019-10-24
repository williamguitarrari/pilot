import {
  __,
  all,
  both,
  is,
  lte,
  gte,
  map,
  pipe,
  split,
} from 'ramda'

const isBetween = (min, max) => both(
  gte(__, min),
  lte(__, max)
)

const areValidDays = all(
  both(
    is(Number), isBetween(1, 31)
  )
)

const validateAnticipationDays = pipe(
  split(','),
  map(Number),
  areValidDays
)

const validate = message => value => !validateAnticipationDays(value) && message

export default validate
