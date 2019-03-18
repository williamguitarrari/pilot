import {
  call,
  path,
} from 'ramda'

import {
  ANTICIPABLE_LIMITS_REQUEST,
  ANTICIPABLE_LIMITS_RECEIVE,
  ANTICIPABLE_LIMITS_FAIL,
  DESTROY_ANTICIPATION_REQUEST,
} from './actions'

const initialState = {
  error: null,
  limits: {
    max: null,
    min: null,
  },
  loading: true,
}

const getLimitsProp = propName => path([propName, 'amount'])

export default function anticipationReducer (state = initialState, action) {
  switch (action.type) {
    case ANTICIPABLE_LIMITS_REQUEST: {
      return {
        error: null,
        limits: state.limits,
        loading: true,
      }
    }

    case ANTICIPABLE_LIMITS_RECEIVE: {
      const {
        payload,
      } = action

      return {
        error: null,
        limits: {
          max: call(getLimitsProp('maximum'), payload),
          min: call(getLimitsProp('minimum'), payload),
        },
        loading: false,
      }
    }

    case ANTICIPABLE_LIMITS_FAIL: {
      const {
        payload,
      } = action

      return {
        ...state,
        error: payload,
        loading: false,
      }
    }

    case DESTROY_ANTICIPATION_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }

    default: {
      return state
    }
  }
}
