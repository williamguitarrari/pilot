import { createAction } from 'redux-actions'

export const RESET_STATUS_REQUEST = 'pilot/payment_links/RESET_STATUS_REQUEST'
export const requestResetStatus = createAction(RESET_STATUS_REQUEST)

export const NEXT_STEP_REQUEST = 'pilot/payment_links/NEXT_STEP_REQUEST'
export const requestNextStep = createAction(NEXT_STEP_REQUEST)

export const PREVIOUS_STEP_REQUEST = 'pilot/payment_links/PREVIOUS_STEP_REQUEST'
export const requestPreviousStep = createAction(PREVIOUS_STEP_REQUEST)

export const LINK_POST_REQUEST = 'pilot/payment_links/LINK_POST_REQUEST'
export const createLink = createAction(LINK_POST_REQUEST)

export const LINK_SUCCESS_REQUEST = 'pilot/payment_links/LINK_SUCCESS_REQUEST'
export const requestSuccessLink = createAction(LINK_SUCCESS_REQUEST)

export const LINK_FAIL_REQUEST = 'pilot/payment_links/LINK_FAIL_REQUEST'
export const requestFailLink = createAction(LINK_FAIL_REQUEST)
