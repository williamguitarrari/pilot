import { createAction } from 'redux-actions'

export const GET_LINK_REQUEST = 'pilot/payment_links/details/GET_LINK_REQUEST'
export const getLinkRequest = createAction(GET_LINK_REQUEST)

export const GET_LINK_RECEIVE = 'pilot/payment_links/details/GET_LINKS_RECEIVE'
export const getLinkReceive = createAction(GET_LINK_RECEIVE)
