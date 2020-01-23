import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose } from 'ramda'
import { UserSignUpConfirmation } from '../../../containers/Account/UserSignUp'

const enhanced = compose(
  translate(),
  withRouter
)

const UserSignUpConfirmationPage = ({
  history: {
    replace,
  },
  t,
}) => (
  <UserSignUpConfirmation
    onBackToLogin={() => replace('/account/login')}
    t={t}
  />
)

UserSignUpConfirmationPage.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(UserSignUpConfirmationPage)
