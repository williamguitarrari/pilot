import React from 'react'
import PropTypes from 'prop-types'

import Confirmation from '../Confirmation'

const ResetConfirmation = ({
  onBackToLogin,
  t,
}) => (
  <Confirmation
    labels={{
      backToLogin: t('back_login_action'),
      confirmation: t('pages.password_reset.confirmation'),
      confirmationEmphasis: t('pages.password_reset.confirmation_emphasis'),
    }}
    onBackToLogin={onBackToLogin}
  />
)

ResetConfirmation.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default ResetConfirmation
