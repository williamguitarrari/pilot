import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

import Logo from './logo.svg'
import VerticalCurves from './vertical-curves.svg'

const OnboardingBackground = ({ children }) => (
  <div className={styles.onboardingBackground}>
    <div className={styles.logoAndImage}>
      <Logo />
    </div>

    <div className={styles.verticalCurves}>
      <VerticalCurves />
    </div>

    <div className={styles.children}>
      {children}
    </div>
  </div>
)

OnboardingBackground.propTypes = {
  children: PropTypes.element.isRequired,
}

export default OnboardingBackground
