import { merge } from 'ramda'
import {
  RESET_STATUS_REQUEST,
  NEXT_STEP_REQUEST,
  PREVIOUS_STEP_REQUEST,
  LINK_POST_REQUEST,
  LINK_FAIL_REQUEST,
  LINK_SUCCESS_REQUEST,
  LINKS_GET_RECEIVE,
  LINKS_GET_REQUEST,
} from './actions'

const initialState = () => ({
  loading: false,
  loadingPaymentLinks: false,
  paymentLinks: null,
  paymentLinkUrl: null,
  step: 'first_step',
})

export default function paymentLinksReducer (state = initialState(), action) {
  switch (action.type) {
    case NEXT_STEP_REQUEST: {
      return merge(state, {
        step: 'second_step',
      })
    }

    case PREVIOUS_STEP_REQUEST: {
      return merge(state, {
        step: 'first_step',
      })
    }

    case LINK_POST_REQUEST: {
      return merge(state, {
        loading: true,
      })
    }

    case LINK_SUCCESS_REQUEST: {
      return merge(state, {
        loading: false,
        paymentLinkUrl: action.payload.url,
        step: 'success_step',
      })
    }

    case LINK_FAIL_REQUEST: {
      return merge(state, {
        loading: false,
        step: 'error_step',
      })
    }

    case LINKS_GET_REQUEST: {
      return merge(state, {
        loadingPaymentLinks: true,
        paymentLinks: null,
      })
    }

    case LINKS_GET_RECEIVE: {
      return merge(state, {
        loadingPaymentLinks: false,
        paymentLinks: action.payload,
      })
    }

    case RESET_STATUS_REQUEST: {
      return initialState()
    }

    default: {
      return state
    }
  }
}
