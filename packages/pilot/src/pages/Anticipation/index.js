import { createAction } from 'redux-actions'

export const ANTICIPABLE_LIMITS_RECEIVE = 'pilot/transactions/ANTICIPABLE_LIMITS_RECEIVE'
export const receiveLimits = createAction(ANTICIPABLE_LIMITS_RECEIVE)
export const ANTICIPABLE_LIMITS_REQUEST = 'pilot/transactions/ANTICIPABLE_LIMITS_REQUEST'
export const requestLimits = createAction(ANTICIPABLE_LIMITS_REQUEST)

export { default } from './reducer'
export { default as Anticipation } from './Anticipation'
export { default as epic } from './epic'
