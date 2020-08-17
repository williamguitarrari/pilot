import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'
import HeartRate from 'emblematic-icons/svg/HeartRate32.svg'
import Shield from 'emblematic-icons/svg/Shield32.svg'
import Target from 'emblematic-icons/svg/Target32.svg'
import CardOptions from './CardOptions'
import DropdownOptions from './DropownOptions'
import OtherOptions from './OtherOptions'
import ProgressBar from './ProgressBar'
import OnboardingBackground from '../../components/OnboardingBackground'
import Spinner from '../../components/Spinner'
import styles from './styles.css'

import ArrowBack from './arrow-back.svg'

const OnboardingContainer = ({
  loading,
  onReturn,
  onSkipOnboarding,
  onSubmit,
  question,
  questionSettings,
  status,
  t,
  userName,
}) => {
  const [others, setOthers] = useState({})
  const [onboardingStarted, startOnboarding] = useState(false)

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
        <div className={styles.onboardingQuestions}>
          <p className={styles.welcome}>{t('pages.onboarding.welcome.header', { userName })}</p>
          <h3 className={styles.welcomeTitle}>{t('pages.onboarding.welcome.title')}</h3>
          <p className={styles.welcomeText}>{t('pages.onboarding.welcome.description')}</p>
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeDescriptionTitle}>
              <Target />
              <p>{t('pages.onboarding.welcome.documentation')}</p>
            </div>
            <p className={styles.welcomeDescription}>{t('pages.onboarding.welcome.documentation_description')}</p>
            <div className={styles.welcomeDescriptionTitle}>
              <Shield />
              <p>{t('pages.onboarding.welcome.antifraud')}</p>
            </div>
            <p className={styles.welcomeDescription}>{t('pages.onboarding.welcome.antifraud_description')}</p>
            <div className={styles.welcomeDescriptionTitle}>
              <HeartRate />
              <p>{t('pages.onboarding.welcome.monitoring')}</p>
            </div>
            <p className={styles.welcomeDescription}>{t('pages.onboarding.welcome.monitoring_description')}</p>
          </div>
          <Button
            onClick={() => startOnboarding(true)}
            size="huge"
          >
            {t('pages.onboarding.welcome.advance')}
          </Button>
        </div>
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
            questionSettings.type === 'card'
              ? (
                <CardOptions
                  handleSubmit={handleSubmit}
                  images={questionSettings.images}
                  options={question.options}
                />
              )
              : (
                <DropdownOptions
                  handleSubmit={handleSubmit}
                  isLastQuestion={status === 'finishing'}
                  options={question.options}
                  placeholderPath={questionSettings.placeholder}
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
  loading: PropTypes.bool.isRequired,
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
    placeholder: PropTypes.string,
    progressPercent: PropTypes.number,
    type: PropTypes.oneOf(['card', 'drop-down']),
  }),
  status: PropTypes.oneOf(['starting', 'boarding', 'finishing']).isRequired,
  t: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
}

OnboardingContainer.defaultProps = {
  onReturn: () => {},
  onSkipOnboarding: () => {},
  onSubmit: () => {},
  question: {},
  questionSettings: {},
}

export default OnboardingContainer
