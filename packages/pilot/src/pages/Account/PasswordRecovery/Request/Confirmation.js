import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { translate } from 'react-i18next'
import Confirmation from '../../../../containers/Account/Confirmation'

const PasswordRecoveryRequestConfirmationPage = ({ t }) => {
  const history = useHistory()

  return (
    <Confirmation
      labels={{
        backToLogin: t('back_login_action'),
        confirmation: t('pages.password_recovery.confirmation'),
        confirmationEmphasis: t('pages.password_recovery.confirmation_emphasis'),
      }}
      onBackToLogin={() => history.push('/account/login')}
    />
  )
}

PasswordRecoveryRequestConfirmationPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(PasswordRecoveryRequestConfirmationPage)
