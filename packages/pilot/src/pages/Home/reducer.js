import {
  METRICS_RECEIVE,
  METRICS_REQUEST,
  METRICS_REQUEST_FAIL,
} from './actions'

const initialState = {
  loading: {
    metrics: true,
  },
  metrics: null,
}

export default function anticipationReducer (state = initialState, action) {
  switch (action.type) {
    case METRICS_REQUEST: {
      return {
        loading: {
          metrics: true,
        },
      }
    }

    case METRICS_RECEIVE: {
      const {
        payload,
      } = action

      return {
        loading: {
          metrics: false,
        },
        metrics: payload,
      }
    }

    case METRICS_REQUEST_FAIL: {
      return {
        ...state,
        loading: {
          metrics: false,
        },
      }
    }

    default: {
      return state
    }
  }
}
