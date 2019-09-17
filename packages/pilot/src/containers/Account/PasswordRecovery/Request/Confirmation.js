import React from 'react'
import PropTypes from 'prop-types'

import Confirmation from '../../Confirmation'

const RecoveryConfirmation = ({
  onBackToLogin,
  t,
}) => (
  <Confirmation
    labels={{
      backToLogin: t('back_login_action'),
      confirmation: t('pages.password_recovery.confirmation'),
      confirmationEmphasis: t('pages.password_recovery.confirmation_emphasis'),
    }}
    onBackToLogin={onBackToLogin}
  />
)

RecoveryConfirmation.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default RecoveryConfirmation
