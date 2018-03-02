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
} from '.'

const initialState = {
  loading: false,
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
      })
    }

    case LOGIN_REQUEST: {
      return merge(state, { loading: true, errors: null })
    }

    case LOGIN_RECEIVE: {
      if (action.error) {
        return merge(
          state,
          {
            client: undefined,
            errors: createErrors(action.payload),
          }
        )
      }

      return merge(
        state,
        {
          client: action.payload,
          errors: undefined,
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
