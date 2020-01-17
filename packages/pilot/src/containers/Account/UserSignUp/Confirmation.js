import React from 'react'
import PropTypes from 'prop-types'

import Confirmation from '../Confirmation'

const UserSignUpConfirmation = ({
  onBackToLogin,
  t,
}) => (
  <Confirmation
    labels={{
      backToLogin: t('back_login_action'),
      confirmation: t('sign_up.user.confirmation'),
      confirmationEmphasis: t('sign_up.user.confirmation_emphasis'),
    }}
    onBackToLogin={onBackToLogin}
  />
)

UserSignUpConfirmation.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default UserSignUpConfirmation
