import { of as rxOf } from 'rxjs'
import {
  catchError,
  map,
  mergeMap,
} from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import shouldSkipOnboarding from '../../validation/shouldSkipOnboarding'
import {
  addOnboardingAnswers,
  receiveOnboardingAnswers,
  ONBOARDING_ANSWERS_FAIL,
  fetchingOnboardingAnswers,
  FETCHING_ONBOARDING_ANSWERS,
  skipOnboarding,
  failOnboardingAnswers,
} from './actions'

import { COMPANY_RECEIVE } from '../Account/actions/actions'
import { POST_ANSWER } from '../Onboarding/actions'
import { clearLocalErrors } from '../ErrorBoundary/actions'

const onboardingAnswersEpic = (action$, state$) => action$
  .pipe(
    ofType(FETCHING_ONBOARDING_ANSWERS),
    mergeMap(() => {
      const state = state$.value
      const { account: { client } } = state
      return client.onboardingAnswers.all()
    }),
    map(receiveOnboardingAnswers),
    catchError((error) => {
      const { message } = error
      return rxOf(failOnboardingAnswers({ message }))
    })
  )

const failAnswersEpic = action$ => action$
  .pipe(
    ofType(ONBOARDING_ANSWERS_FAIL),
    map(clearLocalErrors)
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
  failAnswersEpic,
  fetchAnswersEpic,
  onboardingAnswersEpic,
  postAnswersEpic
)
