import { createAction } from 'redux-actions'

export const ANTICIPABLE_LIMITS_RECEIVE = 'pilot/transactions/ANTICIPABLE_LIMITS_RECEIVE'
export const receiveLimits = createAction(ANTICIPABLE_LIMITS_RECEIVE)
export const ANTICIPABLE_LIMITS_REQUEST = 'pilot/transactions/ANTICIPABLE_LIMITS_REQUEST'
export const ANTICIPABLE_LIMITS_FAIL = 'pilot/transactions/ANTICIPABLE_LIMITS_FAIL'
export const failLimits = createAction(ANTICIPABLE_LIMITS_FAIL)
export const requestLimits = createAction(ANTICIPABLE_LIMITS_REQUEST)
export const DESTROY_ANTICIPATION_RECEIVE = 'pilot/transactions/DESTROY_ANTICIPATION_RECEIVE'
export const destroyAnticipationReceive =
  createAction(DESTROY_ANTICIPATION_RECEIVE)
export const DESTROY_ANTICIPATION_REQUEST = 'pilot/transactions/DESTROY_ANTICIPATION_REQUEST'
export const destroyAnticipation = createAction(DESTROY_ANTICIPATION_REQUEST)

export { default } from './reducer'
export { default as Anticipation } from './Anticipation'
export { default as epic } from './epic'
