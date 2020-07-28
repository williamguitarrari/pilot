import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.css'

const Account = ({
  logo: Logo,
  primaryContent,
  secondaryContent,
  t,
}) => (
  <div className={styles.twoSidesView}>
    <div className={styles.interactionSide}>
      <div className={styles.interactionSideContent}>
        <div className={styles.logo}>
          <Logo alt={t('landing.logo')} width={170} height={45} />
        </div>
        {primaryContent}
      </div>
    </div>
    <div className={styles.presentationSide}>
      {secondaryContent}
    </div>
  </div>
)

Account.propTypes = {
  logo: PropTypes.func.isRequired,
  primaryContent: PropTypes.node.isRequired,
  secondaryContent: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired,
}

export default Account
