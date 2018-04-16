import {
  apply,
  map,
  merge,
  mergeAll,
  objOf,
  path,
  pipe,
  props,
} from 'ramda'

import {
  ACCOUNT_RECEIVE,
  COMPANY_RECEIVE,
  LOGIN_FAIL,
  LOGIN_RECEIVE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
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
        errors: null,
        user: action.payload,
      })
    }

    case COMPANY_RECEIVE: {
      return merge(state, {
        company: action.payload,
        errors: null,
        loading: false,
      })
    }

    case LOGIN_REQUEST: {
      return merge(state, {
        errors: null,
        loading: true,
        user: null,
      })
    }
    case LOGIN_FAIL: {
      return merge(
        state,
        {
          client: null,
          errors: createErrors(action.payload),
          loading: false,
          sessionId: null,
          user: null,
        }
      )
    }
    case LOGIN_RECEIVE: {
      return merge(
        state,
        {
          client: action.payload,
          errors: null,
          loading: false,
          sessionId: action.payload.authentication.session_id,
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
