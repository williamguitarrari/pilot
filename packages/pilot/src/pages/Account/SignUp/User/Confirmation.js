import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose } from 'ramda'
import { UserSignupConfirmation } from '../../../../containers/Account/SignUp/User'

const enhanced = compose(
  translate(),
  withRouter
)

const UserSignupConfirmationPage = ({
  history: {
    replace,
  },
  t,
}) => (
  <UserSignupConfirmation
    onBackToLogin={() => replace('/account/login')}
    t={t}
  />
)

UserSignupConfirmationPage.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(UserSignupConfirmationPage)
