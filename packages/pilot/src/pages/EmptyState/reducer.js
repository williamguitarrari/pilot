import {
  ONBOARDING_ANSWERS_RECEIVE,
  ONBOARDING_ANSWERS_RESET,
} from './actions'

const makeInitialState = () => ({
  onboardingAnswers: null,
})

export default function welcomeReducer (state = makeInitialState(), action) {
  switch (action.type) {
    case ONBOARDING_ANSWERS_RECEIVE: {
      const {
        payload,
      } = action

      return { onboardingAnswers: payload }
    }

    case ONBOARDING_ANSWERS_RESET: {
      return makeInitialState()
    }

    default: {
      return state
    }
  }
}
