import React from 'react'
import PropTypes from 'prop-types'
import {
  __,
  always,
  cond,
  gt,
  T,
} from 'ramda'
import { SecondaryLinearProgress } from 'former-kit'
import styles from './styles.css'

const setSkipVisibility = cond([
  [gt(__, 75), always('unset')],
  [T, always('hidden')],
])

const ProgressBar = ({
  onSkipOnboarding,
  progressPercent,
  t,
}) => (
  <div
    className={styles.onboardingProgress}
  >
    <SecondaryLinearProgress
      value={progressPercent}
      max={100}
    />
    <button
      className={styles.skipOnboarding}
      style={{
        visibility: setSkipVisibility(progressPercent),
      }}
      onClick={onSkipOnboarding}
      role="link"
      type="button"
    >
      {t('pages.onboarding.skip')}
    </button>
  </div>
)

ProgressBar.propTypes = {
  onSkipOnboarding: PropTypes.func.isRequired,
  progressPercent: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
}

export default ProgressBar
