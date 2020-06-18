import { merge } from 'ramda'
import {
  CREATE_LINK_FAIL,
  CREATE_LINK_RECEIVE,
  CREATE_LINK_REQUEST,
  GET_LINKS_RECEIVE,
  GET_LINKS_REQUEST,
  NEXT_STEP_REQUEST,
  PREVIOUS_STEP_REQUEST,
  RESET_STEPS_REQUEST,
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

    case CREATE_LINK_REQUEST: {
      return merge(state, {
        loading: true,
      })
    }

    case CREATE_LINK_RECEIVE: {
      return merge(state, {
        loading: false,
        paymentLinkUrl: action.payload.url,
        step: 'success_step',
      })
    }

    case CREATE_LINK_FAIL: {
      return merge(state, {
        loading: false,
        step: 'error_step',
      })
    }

    case GET_LINKS_REQUEST: {
      return merge(state, {
        loadingPaymentLinks: true,
        paymentLinks: null,
      })
    }

    case GET_LINKS_RECEIVE: {
      return merge(state, {
        loadingPaymentLinks: false,
        paymentLinks: action.payload,
      })
    }

    case RESET_STEPS_REQUEST: {
      return initialState()
    }

    default: {
      return state
    }
  }
}
