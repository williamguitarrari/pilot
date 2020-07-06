import { createAction } from 'redux-actions'

export const GET_LINK_REQUEST = 'pilot/payment_links/details/GET_LINK_REQUEST'
export const getLinkRequest = createAction(GET_LINK_REQUEST)

export const GET_LINK_RECEIVE = 'pilot/payment_links/details/GET_LINKS_RECEIVE'
export const getLinkReceive = createAction(GET_LINK_RECEIVE)

export const CANCEL_LINK_REQUEST = 'pilot/payment_links/details/CANCEL_LINK_REQUEST'
export const cancelLinkRequest = createAction(CANCEL_LINK_REQUEST)

export const GET_TRANSACTIONS_REQUEST = 'pilot/payment_links/transactions/GET_TRANSACTIONS_REQUEST'
export const getTransactionsRequest = createAction(GET_TRANSACTIONS_REQUEST)

export const GET_TRANSACTIONS_RECEIVE = 'pilot/payment_links/transactions/GET_TRANSACTIONS_RECEIVE'
export const getTransactionsReceive = createAction(GET_TRANSACTIONS_RECEIVE)
