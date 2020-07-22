import {
  ADD_ONBOARDING_ANSWERS,
  ONBOARDING_ANSWERS_RECEIVE,
  ONBOARDING_ANSWERS_RESET,
} from './actions'

const makeInitialState = () => ({
  onboardingAnswers: undefined,
})

export default function welcomeReducer (state = makeInitialState(), action) {
  switch (action.type) {
    case ONBOARDING_ANSWERS_RECEIVE: {
      const {
        payload,
      } = action

      return { onboardingAnswers: payload }
    }
    case ADD_ONBOARDING_ANSWERS: {
      const {
        payload,
      } = action

      return {
        onboardingAnswers: {
          ...state.onboardingAnswers,
          ...payload,
        },
      }
    }
    case ONBOARDING_ANSWERS_RESET: {
      return makeInitialState()
    }

    default: {
      return state
    }
  }
}
