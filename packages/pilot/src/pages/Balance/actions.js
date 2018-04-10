import { createAction } from 'redux-actions'

export const BALANCE_REQUEST = 'pilot/transactions/BALANCE_REQUEST'
export const requestBalance = createAction(BALANCE_REQUEST)

export const BALANCE_RECEIVE = 'pilot/transactions/BALANCE_RECEIVE'
export const receiveBalance = createAction(BALANCE_RECEIVE)
