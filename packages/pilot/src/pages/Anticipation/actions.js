import { createAction } from 'redux-actions'

export const ANTICIPABLE_LIMITS_RECEIVE = 'pilot/anticipation/ANTICIPABLE_LIMITS_RECEIVE'
export const receiveLimits = createAction(ANTICIPABLE_LIMITS_RECEIVE)

export const ANTICIPABLE_LIMITS_REQUEST = 'pilot/anticipation/ANTICIPABLE_LIMITS_REQUEST'
export const requestLimits = createAction(ANTICIPABLE_LIMITS_REQUEST)

export const ANTICIPABLE_LIMITS_FAIL = 'pilot/anticipation/ANTICIPABLE_LIMITS_FAIL'
export const failLimits = createAction(ANTICIPABLE_LIMITS_FAIL)

export const DESTROY_ANTICIPATION_REQUEST = 'pilot/anticipation/DESTROY_ANTICIPATION_REQUEST'
export const destroyAnticipation = createAction(DESTROY_ANTICIPATION_REQUEST)
