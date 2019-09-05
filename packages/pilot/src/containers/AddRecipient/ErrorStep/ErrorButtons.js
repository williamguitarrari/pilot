import React from 'react'
import PropTypes from 'prop-types'
import LoginAgainButton from './LoginAgainButton'
import ExitButton from './ExitButton'
import TryAgainAndExitButtons from './TryAgainAndExitButtons'

import {
  possibleErrors,
  AUTHENTICATION_ERROR,
  PERMISSION_ERROR,
  SERVER_ERROR,
  UNKNOWN_ERROR,
} from '../../../formatters/errorType'

const ErrorButtons = ({
  error,
  onExit,
  onLoginAgain,
  onTryAgain,
  t,
}) => {
  if (error === AUTHENTICATION_ERROR) {
    return (
      <LoginAgainButton
        onLoginAgain={onLoginAgain}
        t={t}
      />
    )
  }

  if (error === PERMISSION_ERROR || error === SERVER_ERROR) {
    return (
      <ExitButton
        onExit={onExit}
        t={t}
      />
    )
  }

  return (
    <TryAgainAndExitButtons
      onExit={onExit}
      onTryAgain={onTryAgain}
      t={t}
    />
  )
}

ErrorButtons.propTypes = {
  error: PropTypes.oneOf(possibleErrors),
  onExit: PropTypes.func.isRequired,
  onLoginAgain: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ErrorButtons.defaultProps = {
  error: UNKNOWN_ERROR,
}

export default ErrorButtons
