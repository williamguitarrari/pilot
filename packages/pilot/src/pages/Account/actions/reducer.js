import {
  apply,
  objOf,
  merge,
  mergeAll,
  pipe,
  map,
  path,
  props,
} from 'ramda'

import {
  ACCOUNT_RECEIVE,
  LOGIN_REQUEST,
  LOGIN_RECEIVE,
  LOGOUT_REQUEST,
  LOGIN_FAIL,
} from '.'

const initialState = {
  loading: false,
  sessionId: null,
}

const parseErrorObject = pipe(
  props(['parameter_name', 'message']),
  apply(objOf)
)

const createErrors = pipe(
  path(['response', 'errors']),
  map(parseErrorObject),
  mergeAll
)

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_RECEIVE: {
      return merge(state, {
        user: action.payload,
        loading: false,
        errors: null,
      })
    }

    case LOGIN_REQUEST: {
      return merge(state, {
        loading: true,
        errors: null,
        user: null,
      })
    }
    case LOGIN_FAIL: {
      return merge(
        state,
        {
          client: null,
          errors: createErrors(action.payload),
          user: null,
          sessionId: null,
          loading: false,
        }
      )
    }
    case LOGIN_RECEIVE: {
      return merge(
        state,
        {
          client: action.payload,
          sessionId: action.payload.authentication.session_id,
          errors: null,
          loading: false,
        }
      )
    }

    case LOGOUT_REQUEST: {
      return initialState
    }

    default:
      return state
  }
}
