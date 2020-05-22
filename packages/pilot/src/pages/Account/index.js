import React, { Suspense } from 'react'
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
import Logo from '../../components/Logo'
import Presentation from './Presentation'
import TestLogo from '../../components/Logo/TestLogo'
import Loader from '../../components/Loader'

import environment from '../../environment'
import {
  Login,
  PasswordRecovery,
  PasswordRecoveryConfirmation,
  PasswordReset,
  PasswordResetConfirmation,
  UserSignUp,
  UserSignUpConfirmation,
} from './dynamicImports'

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
        <Suspense
          fallback={(
            <Loader visible />
          )}
        >
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
              path="/account/signup/invite/confirmation"
              render={() => <UserSignUpConfirmation />}
            />
            <Route
              path="/account/signup/invite"
              render={() => <UserSignUp base={base} />}
            />
            <Redirect to="/account/login" />
          </Switch>
        </Suspense>
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
