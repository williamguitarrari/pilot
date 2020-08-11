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
            component={Login}
            path="/account/login"
          />
          <Route
            component={PasswordRecoveryConfirmation}
            path="/account/password/recovery/confirmation"
          />
          <Route
            component={PasswordRecovery}
            path="/account/password/recovery"
          />
          <Route
            component={PasswordResetConfirmation}
            path="/account/password/reset/confirmation"
          />
          <Route
            component={PasswordReset}
            path="/account/password/reset/:token"
          />
          <Route
            component={UserSignUpConfirmation}
            path="/account/signup/invite/confirmation"
          />
          <Route
            component={UserSignUp}
            path="/account/signup/invite"
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
