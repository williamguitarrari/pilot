import { merge } from 'ramda'
import {
  GET_LINK_RECEIVE,
  GET_LINK_REQUEST,
} from './actions'

const initialState = {
  loading: true,
  paymentLink: null,
}

export default function paymentLinksDetails (state = initialState, action) {
  switch (action.type) {
    case GET_LINK_REQUEST: {
      return merge(state, {
        loading: true,
        paymentLink: null,
      })
    }

    case GET_LINK_RECEIVE: {
      return merge(state, {
        loading: false,
        paymentLink: action.payload,
      })
    }

    default: {
      return state
    }
  }
}
