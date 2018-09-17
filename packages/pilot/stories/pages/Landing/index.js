import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Account from '../../../src/containers/Account'
import LoginForm from '../../../src/containers/Account/LoginForm'
import {
  PasswordRecoveryForm,
  PasswordRecoveryConfirmation,
} from '../../../src/containers/Account/PasswordRecovery'
import {
  SignUpForm,
  SignUpConfirmation,
  InvalidEmailError,
} from '../../../src/containers/Account/SignUp'
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

const PresentationFunc = (
  <Presentation
    onGotoSignup={action('signup')}
    onBackToLogin={action('back to login')}
    t={t}
  />
)

storiesOf('Pages', module)
  .add('Login Live', () => (
    <Account
      base="light"
      logo={Placeholder}
      primaryContent={
        <LoginForm
          onLogin={action('login')}
          onPasswordRecovery={action('recover password')}
          t={t}
        />
      }
      secondaryContent={PresentationFunc}
      t={t}
    />
  ))
  .add('Login Test', () => (
    <Account
      base="dark"
      logo={Placeholder}
      primaryContent={
        <LoginForm
          onLogin={action('login')}
          onPasswordRecovery={action('recover password')}
          t={t}
        />
      }
      secondaryContent={PresentationFunc}
      t={t}
    />
  ))
  .add('Password Recovery Form', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <PasswordRecoveryForm
          onPasswordRecovery={action('recover password')}
          onBackToLogin={action('back to login')}
          onSubmit={action('submit')}
          t={t}
        />
      }
      secondaryContent={PresentationFunc}
      t={t}
    />
  ))
  .add('Password Recovery Confirmation', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <PasswordRecoveryConfirmation
          onBackToLogin={action('back to login')}
          onPasswordRecovery={action('recover password')}
          t={t}
        />
      }
      secondaryContent={PresentationFunc}
      t={t}
    />
  ))
  .add('Signup', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <SignUpForm
          onPasswordRecovery={action('recover password')}
          onSubmit={action('submit')}
          t={t}
        />
      }
      secondaryContent={PresentationFunc}
      t={t}
    />
  ))
  .add('Signup Confirmation', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <SignUpConfirmation
          onPasswordRecovery={action('recover password')}
          onBackToLogin={action('back to login')}
          t={t}
        />
      }
      secondaryContent={PresentationFunc}
      t={t}
    />
  ))
  .add('Signup E-mail Invalid', () => (
    <Account
      // eslint-disable-next-line
      logo={Placeholder}
      primaryContent={
        <InvalidEmailError
          onPasswordRecovery={action('recover password')}
          onBackToSignUp={action('back to signup')}
          t={t}
        />
      }
      secondaryContent={PresentationFunc}
      t={t}
    />
  ))
