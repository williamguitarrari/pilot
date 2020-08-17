import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'
import HeartRate from 'emblematic-icons/svg/HeartRate32.svg'
import Shield from 'emblematic-icons/svg/Shield32.svg'
import Target from 'emblematic-icons/svg/Target32.svg'

import styles from './styles.css'

const Welcome = ({ handleStartOnboarding, t, userName }) => (
  <div className={styles.onboardingWelcome}>
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
      onClick={handleStartOnboarding}
      size="huge"
      fullWidth
    >
      {t('pages.onboarding.welcome.advance')}
    </Button>
  </div>
)

Welcome.propTypes = {
  handleStartOnboarding: PropTypes.func,
  t: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
}

Welcome.defaultProps = {
  handleStartOnboarding: () => {},
}

export default Welcome
