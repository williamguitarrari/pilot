import {
  map,
  mergeMap,
} from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import {
  addOnboardingAnswers,
  receiveOnboardingAnswers,
  fetchingOnboardingAnswers,
  FETCHING_ONBOARDING_ANSWERS,
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

const fetchAnswersEpic = action$ => action$
  .pipe(
    ofType(COMPANY_RECEIVE),
    map(fetchingOnboardingAnswers)
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
