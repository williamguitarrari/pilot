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
  loading: true,
  query: null,
}

export default function searchReducer (state = initialState, action) {
  switch (action.type) {
    case BALANCE_REQUEST: {
      const {
        payload: {
          query,
        },
      } = action

      return mergeMomentAware(state, {
        loading: true,
        query,
      })
    }

    case BALANCE_RECEIVE: {
      const {
        payload: {
          query,
        },
      } = action

      return mergeMomentAware(state, {
        loading: false,
        query,
      })
    }

    default:
      return initialState
  }
}
