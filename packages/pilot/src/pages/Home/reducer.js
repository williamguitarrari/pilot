import { assocPath, mergeDeepRight } from 'ramda'
import {
  CONVERSION_RECEIVE,
  CONVERSION_REQUEST,
  CONVERSION_REQUEST_FAIL,
  METRICS_RECEIVE,
  METRICS_REQUEST,
  METRICS_REQUEST_FAIL,
} from './actions'

const initialState = {
  conversion: null,
  loading: {
    conversion: true,
    metrics: true,
  },
  metrics: null,
}

export default function anticipationReducer (state = initialState, action) {
  switch (action.type) {
    case METRICS_REQUEST: {
      return assocPath(['loading', 'metrics'], true, state)
    }

    case METRICS_RECEIVE: {
      const {
        payload,
      } = action

      return mergeDeepRight(state, {
        loading: {
          metrics: false,
        },
        metrics: payload,
      })
    }

    case METRICS_REQUEST_FAIL: {
      return assocPath(['loading', 'metrics'], false, state)
    }

    case CONVERSION_REQUEST: {
      return assocPath(['loading', 'conversion'], true, state)
    }

    case CONVERSION_RECEIVE: {
      const {
        payload,
      } = action

      return mergeDeepRight(state, {
        conversion: payload,
        loading: {
          conversion: false,
        },
      })
    }

    case CONVERSION_REQUEST_FAIL: {
      return assocPath(['loading', 'conversion'], false, state)
    }

    default: {
      return state
    }
  }
}
