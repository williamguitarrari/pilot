import {
  BALANCE_REQUEST,
  BALANCE_RECEIVE,
} from './actions'

const initialState = {
  error: null,
  loading: true,
  query: null,
}

export default function balanceReducer (state, action) {
  switch (action.type) {
    case BALANCE_REQUEST: {
      const {
        payload: {
          query,
        },
      } = action

      return {
        error: null,
        loading: true,
        query,
      }
    }

    case BALANCE_RECEIVE: {
      const {
        error,
        payload,
        payload: {
          query,
        },
      } = action

      if (error) {
        return {
          error: payload.response || {},
          loading: false,
          query,
        }
      }

      return {
        error: null,
        loading: false,
        query,
      }
    }

    default:
      return initialState
  }
}
