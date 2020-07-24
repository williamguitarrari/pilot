import { of as rxOf } from 'rxjs'
import {
  catchError,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import {
  addOnboardingAnswers,
  fetchingOnboardingAnswers,
  failOnboardingAnswers,
  receiveOnboardingAnswers,
} from './actions'

import { LOGIN_RECEIVE } from '../Account/actions/actions'
import { POST_ANSWER } from '../Onboarding/actions'

const onboardingAnswersEpic = (action$, state$) => action$
  .pipe(
    ofType(LOGIN_RECEIVE),
    tap(fetchingOnboardingAnswers),
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

export default combineEpics(onboardingAnswersEpic, postAnswersEpic)
