import { anyPass } from 'ramda'
import {
  ADD_ONBOARDING_ANSWERS,
  FETCHING_ONBOARDING_ANSWERS,
  ONBOARDING_ANSWERS_RECEIVE,
  ONBOARDING_ANSWERS_RESET,
  ONBOARDING_ANSWERS_FAIL,
} from './actions'
import isOnboardingComplete from '../../validation/isOnboardingComplete'
import isPaymentLink from '../../validation/isPaymentLink'
import isRecentlyCreatedCompany from '../../validation/recentCreatedCompany'

const makeInitialState = () => ({
  error: null,
  loading: false,
  onboardingAnswers: undefined,
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

    default: {
      return state
    }
  }
}

const isOnboardingSkipped = () => localStorage.getItem('skip-onboarding')
const isPaymentLinkUser = ({ company }) => company && isPaymentLink(company)
const isDefaultUser = ({ company }) => company && company.type === 'default'
const isFetchOnboardingAnswersFailed = ({ welcome }) => !!welcome.error
const hasCompletedOnboarding = ({
  welcome,
}) => isOnboardingComplete(welcome.onboardingAnswers)
const isNotRecentlyCreatedCompany = ({
  company,
}) => company && !isRecentlyCreatedCompany({ company })

export const shouldSkipOnboarding = ({ company, welcome }) => anyPass([
  isDefaultUser,
  isPaymentLinkUser,
  isOnboardingSkipped,
  isNotRecentlyCreatedCompany,
  isFetchOnboardingAnswersFailed,
  hasCompletedOnboarding,
])({ company, welcome })
