import { createAction } from 'redux-actions'

export const RECIPIENTS_REQUEST = 'pilot/recipients/RECIPIENTS_REQUEST'
export const requestRecipients = createAction(RECIPIENTS_REQUEST)
