import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './style.css'

const Confirmation = ({
  labels: {
    backToLogin,
    confirmation,
    confirmationEmphasis,
  },
}) => (
  <div
    className={classNames(
      styles.primaryContent,
      styles.confirmationContent
    )}
  >
    <p className={classNames(styles.uppercase, styles.paragraph)}>
      <b>{confirmationEmphasis}</b>
      {' '}
      <span>{confirmation}</span>
    </p>
    <div className={styles.actions}>
      <div className={styles.hugeButton}>
        <a className={styles.link} href="/account/login">
          {backToLogin}
        </a>
      </div>
    </div>
  </div>
)

Confirmation.propTypes = {
  labels: PropTypes.shape({
    backToLogin: PropTypes.string.isRequired,
    confirmation: PropTypes.string.isRequired,
    confirmationEmphasis: PropTypes.string.isRequired,
  }).isRequired,
}

export default Confirmation
