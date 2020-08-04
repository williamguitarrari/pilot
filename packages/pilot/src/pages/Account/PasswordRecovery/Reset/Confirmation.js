import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import Confirmation from '../../../../containers/Account/Confirmation'

const PasswordRecoveryResetConfirmationPage = ({ t }) => (
  <Confirmation
    labels={{
      backToLogin: t('back_login_action'),
      confirmation: t('pages.password_reset.confirmation'),
      confirmationEmphasis: t('pages.password_reset.confirmation_emphasis'),
    }}
  />
)

PasswordRecoveryResetConfirmationPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(PasswordRecoveryResetConfirmationPage)
