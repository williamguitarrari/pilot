import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'
import styles from './style.css'

const Confirmation = ({
  labels: {
    backToLogin,
    confirmation,
    confirmationEmphasis,
  },
}) => {
  const history = useHistory()

  return (
    <>
      <span className={styles.confirmationMessage}>
        <b>{confirmationEmphasis}</b>
        {' '}
        <span>{confirmation}</span>
      </span>
      <div className={styles.hugeButton}>
        <Button
          onClick={() => history.push('/account/login')}
          size="huge"
        >
          {backToLogin}
        </Button>
      </div>
    </>
  )
}

Confirmation.propTypes = {
  labels: PropTypes.shape({
    backToLogin: PropTypes.string.isRequired,
    confirmation: PropTypes.string.isRequired,
    confirmationEmphasis: PropTypes.string.isRequired,
  }).isRequired,
}

export default Confirmation
