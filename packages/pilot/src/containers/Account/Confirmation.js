import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'
import styles from './style.css'

const Confirmation = ({
  labels: {
    backToLogin,
    confirmation,
    confirmationEmphasis,
  },
}) => (
  <>
    <span className={styles.confirmationMessage}>
      <b>{confirmationEmphasis}</b>
      {' '}
      <span>{confirmation}</span>
    </span>
    <div className={styles.hugeButton}>
      <Button
        onClick={() => {
          window.location.href = '/#/account/login'
        }}
        size="huge"
      >
        {backToLogin}
      </Button>
    </div>
  </>
)

Confirmation.propTypes = {
  labels: PropTypes.shape({
    backToLogin: PropTypes.string.isRequired,
    confirmation: PropTypes.string.isRequired,
    confirmationEmphasis: PropTypes.string.isRequired,
  }).isRequired,
}

export default Confirmation
