import React, { useState } from 'react'
import { validate } from 'p4g4rm3'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { checkA11y } from '@storybook/addon-a11y'

import Account from '../../../src/containers/Account'
import LoginForm from '../../../src/containers/Account/LoginForm'
import {
  PasswordRecoveryForm,
  PasswordRecoveryConfirmation,
} from '../../../src/containers/Account/PasswordRecovery/Request'
import {
  PasswordResetForm,
  PasswordResetConfirmation,
} from '../../../src/containers/Account/PasswordRecovery/Reset'
import {
  CompanySignupForm,
  CompanySignupConfirmation,
} from '../../../src/containers/Account/SignUp/Company'
import {
  UserSignupForm,
  UserSignupConfirmation,
} from '../../../src/containers/Account/SignUp/User'
import Presentation from '../../../src/containers/Account/Presentation'

const t = translation => translation

const Placeholder = props => (
  <svg viewBox="0 0 26.458 26.458" {...props}>
    <g fill="none" stroke="currentColor">
      <path
        strokeWidth={0.268}
        d="M.134 26.324h26.191V.134H.134z"
      />
      <path
        d="M26.194 26.194L.264.264M26.194.265L.264 26.194"
        strokeWidth={0.265}
      />
    </g>
  </svg>
)

const TestPresentation = (
  <Presentation
    environment="test"
    environmentUrl=""
    onRegister={action('register click')}
    t={t}
  />
)

const UserSignup = () => {
  const initialValidations = validate(' ')
  const [validations, setValidations] = useState(initialValidations)

  const validatePassword = logger => (data) => {
    const newValidations = validate(data.password)
    setValidations(newValidations)

    logger(data)
  }

  return (
    <Account
      logo={Placeholder}
      primaryContent={(
        <UserSignupForm
          base="dark"
          email="johndoe@pagar.me"
          onChange={validatePassword(action('onChange'))}
          onPasswordRecovery={action('recover password')}
          onSubmit={validatePassword(action('submit'))}
          passwordValidations={validations}
          t={t}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  )
}

const LivePresentation = (
  <Presentation
    environment="live"
    environmentUrl=""
    onRegister={action('register click')}
    t={t}
  />
)

storiesOf('Pages|Login', module)
  .addDecorator(checkA11y)
  .add('Login Live', () => (
    <Account
      base="light"
      logo={Placeholder}
      primaryContent={(
        <LoginForm
          base="light"
          onLogin={action('login')}
          onPasswordRecovery={action('recover password')}
          t={t}
        />
      )}
      secondaryContent={LivePresentation}
      t={t}
    />
  ))
  .add('Login Test', () => (
    <Account
      base="dark"
      logo={Placeholder}
      primaryContent={(
        <LoginForm
          base="dark"
          onLogin={action('login')}
          onPasswordRecovery={action('recover password')}
          t={t}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))
  .add('Password Recovery Form', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={(
        <PasswordRecoveryForm
          base="dark"
          onPasswordRecovery={action('recover password')}
          onBackToLogin={action('back to login')}
          onSubmit={action('submit')}
          t={t}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))
  .add('Password Recovery Confirmation', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={(
        <PasswordRecoveryConfirmation
          onBackToLogin={action('back to login')}
          onPasswordRecovery={action('recover password')}
          t={t}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))
  .add('Password Reset Form', () => (
    <Account
      logo={Placeholder}
      primaryContent={(
        <PasswordResetForm
          base="dark"
          onChange={action('change')}
          onSubmit={action('submit')}
          t={t}
          validations={{
            errors: [],
          }}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))
  .add('Password Reset Confirmation', () => (
    <Account
      logo={Placeholder}
      primaryContent={(
        <PasswordResetConfirmation
          base="dark"
          onBackToLogin={action('back to login')}
          t={t}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))

storiesOf('Pages|Signup', module)
  .addDecorator(checkA11y)
  .add('Company Signup', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={(
        <CompanySignupForm
          base="dark"
          onPasswordRecovery={action('recover password')}
          onSubmit={action('submit')}
          t={t}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))
  .add('Company Signup Confirmation', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={(
        <CompanySignupConfirmation
          onPasswordRecovery={action('recover password')}
          onBackToLogin={action('back to login')}
          t={t}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))
  .add('User Signup', () => <UserSignup />)
  .add('User Signup Confirmation', () => (
    <Account
      logo={Placeholder}
      primaryContent={(
        <UserSignupConfirmation
          onPasswordRecovery={action('recover password')}
          onBackToLogin={action('back to login')}
          t={t}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))
