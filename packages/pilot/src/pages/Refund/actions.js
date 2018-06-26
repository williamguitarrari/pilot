import { createAction } from 'redux-actions'

export const REFUND_REQUEST = 'pilot/refund/REFUND_REQUEST'
export const requestRefund = createAction(REFUND_REQUEST)

export const REFUND_RECEIVE = 'pilot/refund/REFUND_RECEIVE'
export const receiveRefund = createAction(REFUND_RECEIVE)
