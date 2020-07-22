import { createAction } from 'redux-actions'

export const ONBOARDING_ANSWERS_RECEIVE = 'pilot/welcome/ONBOARDING_ANSWERS_RECEIVE'
export const receiveOnboardingAnswers = createAction(ONBOARDING_ANSWERS_RECEIVE)

export const ONBOARDING_ANSWERS_REQUEST = 'pilot/welcome/ONBOARDING_ANSWERS_REQUEST'
export const requestOnboardingAnswers = createAction(ONBOARDING_ANSWERS_REQUEST)

export const ONBOARDING_ANSWERS_FAIL = 'pilot/welcome/ONBOARDING_ANSWERS_FAIL'
export const failOnboardingAnswers = createAction(ONBOARDING_ANSWERS_FAIL)

export const ONBOARDING_ANSWERS_RESET = 'pilot/welcome/ONBOARDING_ANSWERS_RESET'
export const resetOnboardingAnswers = createAction(ONBOARDING_ANSWERS_RESET)

export const ADD_ONBOARDING_ANSWERS = 'pilot/welcome/ADD_ONBOARDING_ANSWERS'
export const addOnboardingAnswers = createAction(ADD_ONBOARDING_ANSWERS)
