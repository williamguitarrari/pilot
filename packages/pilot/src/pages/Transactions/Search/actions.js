import { createAction } from 'redux-actions'

export const SEARCH_REQUEST = 'pilot/transactions/SEARCH_REQUEST'
export const requestSearch = createAction(SEARCH_REQUEST)

export const SEARCH_RECEIVE = 'pilot/transactions/SEARCH_RECEIVE'
export const receiveSearch = createAction(SEARCH_RECEIVE)

export const SEARCH_CLEAR = 'pilot/transactions/SEARCH_CLEAR'
export const clearSearch = createAction(SEARCH_CLEAR)
