import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { translate } from 'react-i18next'
import Confirmation from '../../../../containers/Account/Confirmation'

const PasswordRecoveryResetConfirmationPage = ({ t }) => {
  const history = useHistory()

  return (
    <Confirmation
      labels={{
        backToLogin: t('back_login_action'),
        confirmation: t('pages.password_reset.confirmation'),
        confirmationEmphasis: t('pages.password_reset.confirmation_emphasis'),
      }}
      onBackToLogin={() => history.push('/account/login')}
    />
  )
}

PasswordRecoveryResetConfirmationPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(PasswordRecoveryResetConfirmationPage)
