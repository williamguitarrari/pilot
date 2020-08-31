import React from 'react'
import PropTypes from 'prop-types'
import { Alert as AlertContainer } from 'former-kit'
import Loader from '../../../components/Loader'
import Content from './Content'

const Alert = ({
  email,
  error,
  handleStatus,
  status,
  t,
}) => {
  const AlertContent = Content[error?.code]
  const message = error
    ? error.message
    : t('login.network_error')

  if (status.name === 'loading') {
    return (
      <Loader
        position="relative"
        visible
      />
    )
  }

  return (
    <AlertContainer
      icon={status.icon}
      type={status.type}
    >
      { AlertContent
        ? (
          <AlertContent
            handleStatus={handleStatus}
            email={email}
            code={error.code}
            status={status.name}
            t={t}
          />
        )
        : <span>{message}</span>
      }
    </AlertContainer>
  )
}

Alert.propTypes = {
  email: PropTypes.string.isRequired,
  error: PropTypes.shape({
    code: PropTypes.string,
    message: PropTypes.string.isRequired,
    parameter_name: PropTypes.string,
  }).isRequired,
  handleStatus: PropTypes.func.isRequired,
  status: PropTypes.shape({
    icon: PropTypes.node,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  t: PropTypes.func.isRequired,
}

Alert.defaultProps = {
  status: {},
}

export default Alert
