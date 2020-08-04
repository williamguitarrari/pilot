import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose } from 'ramda'
import Confirmation from '../../../../containers/Account/Confirmation'

const enhanced = compose(
  translate(),
  withRouter
)

class PasswordRecoveryConfirmationPage extends PureComponent {
  render () {
    const { t } = this.props

    return (
      <Confirmation
        labels={{
          backToLogin: t('back_login_action'),
          confirmation: t('pages.password_recovery.confirmation'),
          confirmationEmphasis: t('pages.password_recovery.confirmation_emphasis'),
        }}
      />
    )
  }
}

PasswordRecoveryConfirmationPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(PasswordRecoveryConfirmationPage)
