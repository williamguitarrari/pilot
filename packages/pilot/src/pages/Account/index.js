import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import { translate } from 'react-i18next'

import Account from '../../containers/Account'
import Logo from '../../components/Logo'
import Presentation from './Presentation'
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

const AccountArea = ({ t }) => (
  <Account
    t={t}
    logo={<Logo test={environment === 'test'} alt={t('landing.logo')} />}
    primaryContent={(
      <Suspense
        fallback={(
          <Loader visible />
          )}
      >
        <Switch>
          <Route
            path="/account/login"
            render={() => <Login />}
          />
          <Route
            path="/account/password/recovery/confirmation"
            render={() => <PasswordRecoveryConfirmation />}
          />
          <Route
            path="/account/password/recovery"
            render={() => <PasswordRecovery />}
          />
          <Route
            path="/account/password/reset/confirmation"
            render={() => <PasswordResetConfirmation />}
          />
          <Route
            path="/account/password/reset/:token"
            render={() => <PasswordReset />}
          />
          <Route
            path="/account/signup/invite/confirmation"
            render={() => <UserSignUpConfirmation />}
          />
          <Route
            path="/account/signup/invite"
            render={() => <UserSignUp />}
          />
          <Redirect to="/account/login" />
        </Switch>
      </Suspense>
      )}
    secondaryContent={<Presentation />}
  />
)

AccountArea.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(AccountArea)
