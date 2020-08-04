import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.css'

const Account = ({
  logo,
  primaryContent,
  secondaryContent,
}) => (
  <div className={styles.twoSidesView}>
    <div className={styles.interactionSide}>
      <div className={styles.interactionSideContent}>
        <div className={styles.logo}>
          {logo}
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
  logo: PropTypes.node.isRequired,
  primaryContent: PropTypes.node.isRequired,
  secondaryContent: PropTypes.node.isRequired,
}

export default Account
