import { createAction } from 'redux-actions'

export const RESET_STEPS_REQUEST = 'pilot/payment_links/list/RESET_STEPS_REQUEST'
export const resetStepsRequest = createAction(RESET_STEPS_REQUEST)

export const NEXT_STEP_REQUEST = 'pilot/payment_links/list/NEXT_STEP_REQUEST'
export const nextStepRequest = createAction(NEXT_STEP_REQUEST)

export const PREVIOUS_STEP_REQUEST = 'pilot/payment_links/list/PREVIOUS_STEP_REQUEST'
export const previousStepRequest = createAction(PREVIOUS_STEP_REQUEST)

export const CREATE_LINK_REQUEST = 'pilot/payment_links/list/CREATE_LINK_REQUEST'
export const createLinkRequest = createAction(CREATE_LINK_REQUEST)

export const CREATE_LINK_RECEIVE = 'pilot/payment_links/list/CREATE_LINK_RECEIVE'
export const createLinkReceive = createAction(CREATE_LINK_RECEIVE)

export const CREATE_LINK_FAIL = 'pilot/payment_links/list/CREATE_LINK_FAIL'
export const createLinkFail = createAction(CREATE_LINK_FAIL)

export const GET_LINKS_REQUEST = 'pilot/payment_links/list/GET_LINKS_REQUEST'
export const getLinksRequest = createAction(GET_LINKS_REQUEST)

export const GET_LINKS_RECEIVE = 'pilot/payment_links/list/GET_LINKS_RECEIVE'
export const getLinksReceive = createAction(GET_LINKS_RECEIVE)

export const RESET_PAGINATION_REQUEST = 'pilot/payment_links/list/RESET_PAGINATION_REQUEST'
export const resetPaginationRequest = createAction(RESET_PAGINATION_REQUEST)
