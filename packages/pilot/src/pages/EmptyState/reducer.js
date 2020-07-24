import {
  ADD_ONBOARDING_ANSWERS,
  FETCHING_ONBOARDING_ANSWERS,
  ONBOARDING_ANSWERS_RECEIVE,
  ONBOARDING_ANSWERS_RESET,
  ONBOARDING_ANSWERS_FAIL,
} from './actions'

const makeInitialState = () => ({
  error: null,
  loading: false,
  onboardingAnswers: undefined,
})

export default function welcomeReducer (state = makeInitialState(), action) {
  switch (action.type) {
    case FETCHING_ONBOARDING_ANSWERS: {
      return {
        error: null,
        loading: true,
        onboardingAnswers: undefined,
      }
    }
    case ONBOARDING_ANSWERS_RECEIVE: {
      const {
        payload,
      } = action

      return {
        ...state,
        error: null,
        loading: false,
        onboardingAnswers: payload,
      }
    }
    case ADD_ONBOARDING_ANSWERS: {
      const {
        payload,
      } = action

      return {
        ...state,
        onboardingAnswers: {
          ...state.onboardingAnswers,
          ...payload,
        },
      }
    }
    case ONBOARDING_ANSWERS_RESET: {
      return makeInitialState()
    }

    case ONBOARDING_ANSWERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default: {
      return state
    }
  }
}
