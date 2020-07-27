import {
  ADD_ONBOARDING_ANSWERS,
  FETCHING_ONBOARDING_ANSWERS,
  ONBOARDING_ANSWERS_RECEIVE,
  ONBOARDING_ANSWERS_RESET,
  ONBOARDING_ANSWERS_FAIL,
  SKIP_ONBOARDING,
} from './actions'
import isOnboardingComplete from '../../validation/isOnboardingComplete'

const makeInitialState = () => ({
  error: null,
  loading: false,
  onboardingAnswers: undefined,
  skippedOnboarding: false,
})

export default function welcomeReducer (state = makeInitialState(), action) {
  switch (action.type) {
    case FETCHING_ONBOARDING_ANSWERS: {
      return {
        ...state,
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

    case SKIP_ONBOARDING:
      return {
        ...state,
        skippedOnboarding: true,
      }

    default: {
      return state
    }
  }
}

export const shouldSkipOnboarding = ({
  error,
  onboardingAnswers,
  skippedOnboarding,
}) => !!error || isOnboardingComplete(onboardingAnswers) || skippedOnboarding
