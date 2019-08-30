import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import {
  compose,
} from 'ramda'

import {
  PasswordResetConfirmation,
} from '../../../../containers/Account/PasswordRecovery/Reset'

const enhance = compose(
  translate(),
  withRouter
)

const Confirmation = ({
  history: {
    replace,
  },
  t,
}) => (
  <PasswordResetConfirmation
    onBackToLogin={() => replace('/account/login')}
    t={t}
  />
)

Confirmation.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhance(Confirmation)
