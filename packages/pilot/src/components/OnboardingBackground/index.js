import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

import Logo from './logo.svg'
import WomanInBalance from '../../assets/woman-in-balance.svg'

const OnboardingBackground = ({ children }) => (
  <div className={styles.onboardingBackground}>
    <div className={styles.logoAndImage}>
      <Logo />
      <div className={styles.centerImage}>
        <WomanInBalance />
      </div>
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
