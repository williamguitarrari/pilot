import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'
import CardOptions from './CardOptions'
import SegmentOptions from './SegmentOptions'
import DropdownOptions from './DropownOptions'
import OtherOptions from './OtherOptions'
import ProgressBar from './ProgressBar'
import Welcome from './Welcome'
import OnboardingBackground from '../../components/OnboardingBackground'
import Spinner from '../../components/Spinner'
import styles from './styles.css'

import ArrowBack from './arrow-back.svg'

const OnboardingContainer = ({
  handleStartOnboarding,
  loading,
  onReturn,
  onSkipOnboarding,
  onSubmit,
  onboardingStarted,
  question,
  questionSettings,
  status,
  t,
  userName,
}) => {
  const [others, setOthers] = useState({})

  useEffect(() => setOthers({}), [question])

  const handleOthers = (value, isChecked) => setOthers({
    ...others,
    [value]: isChecked,
  })

  const handleSubmit = answer => onSubmit(answer, others)

  if (loading) {
    return (
      <OnboardingBackground>
        <div className={styles.loading}>
          <Spinner />
        </div>
      </OnboardingBackground>
    )
  }

  if (!onboardingStarted) {
    return (
      <OnboardingBackground>
        <Welcome
          t={t}
          userName={userName}
          handleStartOnboarding={handleStartOnboarding}
        />
      </OnboardingBackground>
    )
  }

  const header = status === 'starting'
    ? (<p className={styles.welcome}>{t('pages.onboarding.welcome', { userName })}</p>)
    : <Button fill="clean" icon={<ArrowBack />} onClick={onReturn} />

  const { deadEnd: DeadEnd } = questionSettings
  if (DeadEnd) {
    return (
      <OnboardingBackground>
        <div>
          {header}
          <DeadEnd onSubmit={handleSubmit} t={t} />
        </div>
      </OnboardingBackground>
    )
  }

  return (
    <OnboardingBackground>
      <div className={styles.onboardingQuestions}>
        <div>
          {header}
          <h1 className={styles.title}>{question.title}</h1>
          {
            questionSettings.type === 'card' && (
            <CardOptions
              handleSubmit={handleSubmit}
              images={questionSettings.images}
              options={question.options}
            />
            )
          }
          {
            questionSettings.type === 'drop-down' && (
            <DropdownOptions
              handleSubmit={handleSubmit}
              isLastQuestion={status === 'finishing'}
              options={question.options}
              placeholderPath={questionSettings.placeholder}
              t={t}
            />
            )
          }
          {
            questionSettings.type === 'segments' && (
              <SegmentOptions
                handleSubmit={handleSubmit}
                images={questionSettings.images}
                options={question.options}
                notFoundText={questionSettings.notFoundText}
                t={t}
              />
            )
          }
          <OtherOptions
            options={question.others}
            others={others}
            handleOthers={handleOthers}
          />
        </div>
        <ProgressBar
          onSkipOnboarding={onSkipOnboarding}
          progressPercent={questionSettings.progressPercent}
          t={t}
        />
      </div>
    </OnboardingBackground>
  )
}

OnboardingContainer.propTypes = {
  handleStartOnboarding: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  onboardingStarted: PropTypes.bool.isRequired,
  onReturn: PropTypes.func,
  onSkipOnboarding: PropTypes.func,
  onSubmit: PropTypes.func,
  question: PropTypes.shape({
    label: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    others: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    title: PropTypes.string,
  }),
  questionSettings: PropTypes.shape({
    deadEnd: PropTypes.func,
    images: PropTypes.arrayOf(PropTypes.func),
    notFoundText: PropTypes.string,
    placeholder: PropTypes.string,
    progressPercent: PropTypes.number,
    type: PropTypes.oneOf(['card', 'drop-down', 'segments']),
  }),
  status: PropTypes.oneOf(['starting', 'boarding', 'finishing']).isRequired,
  t: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
}

OnboardingContainer.defaultProps = {
  handleStartOnboarding: () => {},
  onReturn: () => {},
  onSkipOnboarding: () => {},
  onSubmit: () => {},
  question: {},
  questionSettings: {},
}

export default OnboardingContainer
