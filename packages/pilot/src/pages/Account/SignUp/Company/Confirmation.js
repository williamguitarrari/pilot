import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose } from 'ramda'
import { CompanySignupConfirmation } from '../../../../containers/Account/SignUp/Company'

const enhanced = compose(
  translate(),
  withRouter
)

const CompanySignupConfirmationPage = ({
  history: {
    replace,
  },
  t,
}) => (
  <CompanySignupConfirmation
    onBackToLogin={() => replace('/account/login')}
    t={t}
  />
)

CompanySignupConfirmationPage.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(CompanySignupConfirmationPage)
