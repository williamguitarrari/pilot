import { of as rxOf } from 'rxjs'
import {
  map,
  mergeMap,
} from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import shouldSkipOnboarding from '../../validation/shouldSkipOnboarding'
import {
  addOnboardingAnswers,
  receiveOnboardingAnswers,
  fetchingOnboardingAnswers,
  FETCHING_ONBOARDING_ANSWERS,
  skipOnboarding,
  failOnboardingAnswers,
} from './actions'

import { COMPANY_RECEIVE } from '../Account/actions/actions'
import { POST_ANSWER } from '../Onboarding/actions'

const onboardingAnswersEpic = (action$, state$) => action$
  .pipe(
    ofType(FETCHING_ONBOARDING_ANSWERS),
    mergeMap(() => {
      const state = state$.value
      const { account: { client } } = state
      return client.onboardingAnswers.all()
        .catch(({ message }) => ({
          error: true,
          payload: { message },
        }))
    }),
    map((action) => {
      if (action.error) {
        return failOnboardingAnswers({ message: action.payload })
      }

      return receiveOnboardingAnswers(action)
    })
  )

const fetchAnswersEpic = (action$, state$) => action$
  .pipe(
    ofType(COMPANY_RECEIVE),
    mergeMap(() => {
      const state = state$.value
      const { account: { company } } = state
      if (shouldSkipOnboarding({ company })) {
        return rxOf(skipOnboarding())
      }
      return rxOf(fetchingOnboardingAnswers())
    })
  )

const postAnswersEpic = (action$, state$) => action$
  .pipe(
    ofType(POST_ANSWER),
    map(({ payload }) => {
      const state = state$.value
      const { onboarding: { question } } = state

      return {
        [question.label]: payload.answer,
      }
    }),
    map(addOnboardingAnswers)
  )

export default combineEpics(
  fetchAnswersEpic,
  onboardingAnswersEpic,
  postAnswersEpic
)
