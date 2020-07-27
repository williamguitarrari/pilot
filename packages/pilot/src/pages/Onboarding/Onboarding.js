import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import { useMachine } from '@xstate/react'
import { connect } from 'react-redux'
import {
  always,
  compose,
  cond,
  head,
  isNil,
  last,
  pipe,
  prop,
  split,
  isEmpty,
  T,
} from 'ramda'
import { translate } from 'react-i18next'
import {
  machineContextFactory,
  onboardingMachineFactory,
  settingsByQuestion,
} from './machine'
import OnboardingContainer from '../../containers/Onboarding'
import {
  requestOnboardingQuestion as requestOnboardingQuestionAction,
  postOnboardingAnswer as postOnboardingAnswerAction,
  destroyOnboardingAnswer as destroyOnboardingAnswerAction,
} from './actions'
import FakeLoader from '../../components/FakeLoader'

const getUserFirstName = pipe(prop('name'), split(' '), head)

const isStarting = pipe(prop('historyStack'), isEmpty)

const makeStatus = cond([
  [isStarting, always('starting')],
  [prop('isLastStep'), always('finishing')],
  [T, always('boarding')],
])

const mapStateToProps = ({
  account: {
    user,
  },
  onboarding: {
    error,
    loading,
    question,
  },
  welcome: {
    onboardingAnswers,
  },
}) => ({
  error,
  loading,
  onboardingAnswers,
  question,
  userId: prop('id', user),
  userName: getUserFirstName(user),
})

const mapDispatchToProps = {
  destroyOnboardingAnswer: destroyOnboardingAnswerAction,
  postOnboardingAnswer: postOnboardingAnswerAction,
  requestOnboardingQuestion: requestOnboardingQuestionAction,
}

const enhanced = compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

const skipOnboarding = push => () => {
  localStorage.setItem('skip-onboarding', true)
  return push('/home')
}

const Onboarding = ({
  destroyOnboardingAnswer,
  error,
  history: {
    push,
  },
  loading,
  onboardingAnswers,
  postOnboardingAnswer,
  question,
  requestOnboardingQuestion,
  t,
  userId,
  userName,
}) => {
  const [lastAnswerSubmited, setLastAnswerSubmited] = useState(null)

  const machineContext = machineContextFactory(onboardingAnswers)
  const onboardingMachine = onboardingMachineFactory(machineContext)
  const [machine, sendEvent] = useMachine(onboardingMachine)

  const {
    context: {
      currentQuestion,
      historyStack,
      isLastStep,
    },
  } = machine

  useEffect(() => {
    const { deadEnd, questionId } = settingsByQuestion[currentQuestion]
    if (!deadEnd) {
      requestOnboardingQuestion(questionId)
    }
  }, [currentQuestion, requestOnboardingQuestion])

  const onSubmit = (answer, others) => {
    const {
      deadEnd,
      finalStep,
      questionId,
    } = settingsByQuestion[currentQuestion]

    if (finalStep) {
      return setLastAnswerSubmited({
        answer,
        others,
        question_id: questionId,
        user_id: userId,
      })
    }

    if (!deadEnd) {
      postOnboardingAnswer({
        answer,
        others,
        question_id: questionId,
        user_id: userId,
      })
    }

    return sendEvent('NEXT', { answer })
  }

  const onReturn = () => {
    const previousQuestion = last(historyStack)

    if (previousQuestion) {
      const { questionId } = settingsByQuestion[previousQuestion]
      destroyOnboardingAnswer(questionId)
    }

    return sendEvent('BACK')
  }

  if (error) {
    return <Redirect to="/home" />
  }

  const { onboardingAlreadyFinished } = machineContext
  const shouldRedirectToHome = isNil(onboardingAnswers)
    || onboardingAlreadyFinished

  if (shouldRedirectToHome && !lastAnswerSubmited) {
    return <Redirect to="/home" />
  }

  if (lastAnswerSubmited) {
    return (
      <FakeLoader
        runAfterLoader={() => {
          postOnboardingAnswer(lastAnswerSubmited)
        }}
        t={t}
      />
    )
  }

  return (
    <OnboardingContainer
      loading={loading}
      onReturn={onReturn}
      onSkipOnboarding={skipOnboarding(push)}
      onSubmit={onSubmit}
      question={question}
      questionSettings={settingsByQuestion[currentQuestion]}
      status={makeStatus({ historyStack, isLastStep })}
      t={t}
      userName={userName}
    />
  )
}

Onboarding.propTypes = {
  destroyOnboardingAnswer: PropTypes.func.isRequired,
  error: PropTypes.shape(),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  onboardingAnswers: PropTypes.shape({}),
  postOnboardingAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape(),
  requestOnboardingQuestion: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userId: PropTypes.string,
  userName: PropTypes.string,
}

Onboarding.defaultProps = {
  error: null,
  onboardingAnswers: null,
  question: null,
  userId: '',
  userName: '',
}

export default enhanced(Onboarding)
