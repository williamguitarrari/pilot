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

const createLinkInitialState = {
  loadingCreateLink: false,
  paymentLinkUrl: null,
  step: 'first_step',
}

const getLinksInitialState = {
  loadingGetLinks: false,
  paymentLinks: [],
  totalPaymentLinks: null,
}

export default function paymentLinksReducer (state = {
  ...createLinkInitialState,
  ...getLinksInitialState,
}, action) {
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
        loadingCreateLink: true,
      })
    }

    case RESET_STEPS_REQUEST: {
      return {
        ...state,
        ...createLinkInitialState,
      }
    }

    case CREATE_LINK_RECEIVE: {
      return merge(state, {
        loadingCreateLink: false,
        paymentLinkUrl: action.payload.url,
        step: 'success_step',
      })
    }

    case CREATE_LINK_FAIL: {
      return merge(state, {
        loadingCreateLink: false,
        step: 'error_step',
      })
    }

    case GET_LINKS_REQUEST: {
      return merge(state, {
        loadingGetLinks: true,
        paymentLinks: [],
      })
    }

    case GET_LINKS_RECEIVE: {
      return merge(state, {
        loadingGetLinks: false,
        paymentLinks: action.payload.rows,
        totalPaymentLinks: action.payload.totalPaymentLinks,
      })
    }

    default: {
      return state
    }
  }
}
