import { merge } from 'ramda'
import {
  CANCEL_LINK_REQUEST,
  GET_LINK_RECEIVE,
  GET_LINK_REQUEST,
} from './actions'

const initialState = {
  loadingGetLink: true,
  paymentLink: null,
}

export default function paymentLinksDetails (state = initialState, action) {
  switch (action.type) {
    case GET_LINK_REQUEST: {
      return merge(state, {
        loadingGetLink: true,
        paymentLink: null,
      })
    }

    case GET_LINK_RECEIVE: {
      return merge(state, {
        loadingGetLink: false,
        paymentLink: action.payload,
      })
    }

    case CANCEL_LINK_REQUEST: {
      return merge(state, {
        loadingGetLink: true,
      })
    }

    default: {
      return state
    }
  }
}
