import React from 'react'
import PropTypes from 'prop-types'
import Confirmation from '../Confirmation'

const SignupConfirmation = ({
  onBackToLogin,
  t,
}) => (
  <Confirmation
    labels={{
      backToLogin: t('back_login_action'),
      confirmation: t('sign_up.confirmation'),
      confirmationEmphasis: t('sign_up.confirmation_emphasis'),
    }}
    onBackToLogin={onBackToLogin}
  />
)

SignupConfirmation.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SignupConfirmation
