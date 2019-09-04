import { createAction } from 'redux-actions'

export const METRICS_RECEIVE = 'pilot/home/METRICS_RECEIVE'
export const receiveMetrics = createAction(METRICS_RECEIVE)

export const METRICS_REQUEST = 'pilot/home/METRICS_REQUEST'
export const requestMetrics = createAction(METRICS_REQUEST)

export const METRICS_REQUEST_FAIL = 'pilot/home/METRICS_REQUEST_FAIL'
export const failMetrics = createAction(METRICS_REQUEST_FAIL)

export const CONVERSION_RECEIVE = 'pilot/home/CONVERSION_RECEIVE'
export const receiveConversion = createAction(CONVERSION_RECEIVE)

export const CONVERSION_REQUEST = 'pilot/home/CONVERSION_REQUEST'
export const requestConversion = createAction(CONVERSION_REQUEST)

export const CONVERSION_REQUEST_FAIL = 'pilot/home/CONVERSION_REQUEST_FAIL'
export const failConversion = createAction(CONVERSION_REQUEST_FAIL)
