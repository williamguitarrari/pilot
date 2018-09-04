import {
  always,
  applySpec,
  juxt,
  map,
  negate,
  pipe,
  prop,
  sum,
} from 'ramda'

const calculateRequestAmount = pipe(
  juxt([
    prop('amount'),
    pipe(prop('anticipation_fee'), negate),
    pipe(prop('fee'), negate),
  ]),
  sum
)

export const buildPendingRequest = map(applySpec({
  amount: calculateRequestAmount,
  created_at: prop('date_created'),
  id: prop('id'),
  payment_date: prop('payment_date'),
  status: prop('status'),
  type: always('anticipation'),
}))

const findPendingRequests = client => recipientId =>
  client.bulkAnticipations.find({
    recipientId,
    status: 'pending',
  })
    .then(buildPendingRequest)

export default {
  findPendingRequests,
}
