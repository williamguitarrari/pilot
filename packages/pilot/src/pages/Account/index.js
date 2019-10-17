import React from 'react'
import PropTypes from 'prop-types'
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

import {
  compose,
  contains,
} from 'ramda'

import { translate } from 'react-i18next'

import Account from '../../containers/Account'
import Login from './Login'
import Logo from '../../components/Logo'
import PasswordRecovery from './PasswordRecovery/Request'
import PasswordRecoveryConfirmation from './PasswordRecovery/Request/Confirmation'
import PasswordReset from './PasswordRecovery/Reset'
import PasswordResetConfirmation from './PasswordRecovery/Reset/Confirmation'
import Presentation from './Presentation'
import CompanySignup from './SignUp/Company'
import CompanySignupConfirmation from './SignUp/Company/Confirmation'
import UserSignupConfirmation from './SignUp/User/Confirmation'
import UserSignUp from './SignUp/User'
import TestLogo from '../../components/Logo/TestLogo'

import environment from '../../environment'

const DARK_BASE = 'dark'
const LIGHT_BASE = 'light'

const getBaseByPath = (pathname) => {
  if (contains('account', pathname) && environment === 'live') {
    return LIGHT_BASE
  }
  return DARK_BASE
}

const getEnvironmentLogo = () => (
  environment === 'live'
    ? Logo
    : TestLogo
)

const enhance = compose(
  withRouter,
  translate()
)

const AccountArea = ({ history: { location }, t }) => {
  const base = getBaseByPath(location.pathname)
  return (
    <Account
      t={t}
      logo={getEnvironmentLogo()}
      base={base}
      primaryContent={(
        <Switch>
          <Route
            path="/account/login"
            render={() => <Login base={base} />}
          />
          <Route
            path="/account/password/recovery/confirmation"
            render={() => <PasswordRecoveryConfirmation base={base} />}
          />
          <Route
            path="/account/password/recovery"
            render={() => <PasswordRecovery base={base} />}
          />
          <Route
            path="/account/password/reset/confirmation"
            render={() => <PasswordResetConfirmation base={base} />}
          />
          <Route
            path="/account/password/reset/:token"
            render={() => <PasswordReset base={base} />}
          />
          <Route
            path="/account/signup/confirmation"
            render={() => <CompanySignupConfirmation />}
          />
          <Route
            path="/account/signup/invite/confirmation"
            render={() => <UserSignupConfirmation />}
          />
          <Route
            path="/account/signup/invite"
            render={() => <UserSignUp base={base} />}
          />
          <Route
            path="/account/signup"
            render={() => <CompanySignup base={base} />}
          />
          <Redirect to="/account/login" />
        </Switch>
      )}
      secondaryContent={(
        <Switch>
          <Route
            path="/account"
            component={Presentation}
          />
          <Redirect to="/account/login" />
        </Switch>
      )}
    />
  )
}

AccountArea.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhance(AccountArea)
