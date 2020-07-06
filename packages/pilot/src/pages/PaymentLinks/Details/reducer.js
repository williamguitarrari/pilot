import { merge } from 'ramda'
import {
  CANCEL_LINK_REQUEST,
  GET_LINK_RECEIVE,
  GET_LINK_REQUEST,
  GET_TRANSACTIONS_RECEIVE,
  GET_TRANSACTIONS_REQUEST,
} from './actions'

const initialState = {
  loadingGetLink: true,
  loadingGetTransactions: true,
  paymentLink: null,
  transactions: [],
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

    case GET_TRANSACTIONS_REQUEST: {
      return merge(state, {
        loadingGetTransactions: true,
      })
    }

    case GET_TRANSACTIONS_RECEIVE: {
      return merge(state, {
        loadingGetTransactions: false,
        transactions: action.payload,
      })
    }

    default: {
      return state
    }
  }
}
