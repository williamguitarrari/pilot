import moment from 'moment'

import {
  mergeWith,
  is,
} from 'ramda'

import {
  BALANCE_REQUEST,
  BALANCE_RECEIVE,
} from './actions'

const mergeMomentAware = (a, b) => {
  if (is(moment, a) && is(moment, b)) {
    return b
  }

  if (is(Array, a) && is(Array, b)) {
    return b
  }

  if (is(Object, a) && is(Object, b)) {
    return mergeWith(mergeMomentAware, a, b)
  }

  return b
}

const initialState = {
  error: null,
  loading: true,
  query: null,
}

export default function balanceReducer (state = initialState, action) {
  switch (action.type) {
    case BALANCE_REQUEST: {
      const {
        payload: {
          query,
        },
      } = action

      return mergeMomentAware(state, {
        error: null,
        loading: true,
        query,
      })
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
        return mergeMomentAware(state, {
          error: payload.response || {},
          loading: false,
          query,
        })
      }

      return mergeMomentAware(state, {
        error: null,
        loading: false,
        query,
      })
    }

    default:
      return initialState
  }
}
