import React, { useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { validate } from 'p4g4rm3'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withA11y } from '@storybook/addon-a11y'

import Account from '../../../src/containers/Account'
import LoginForm from '../../../src/containers/Account/LoginForm'
import PasswordRecoveryRequest from '../../../src/containers/Account/PasswordRecovery/Request'
import Confirmation from '../../../src/containers/Account/Confirmation'
import PasswordRecoveryReset from '../../../src/containers/Account/PasswordRecovery/Reset'
import {
  UserSignUpForm,
  UserSignUpConfirmation,
} from '../../../src/containers/Account/UserSignUp'
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
    t={t}
  />
)

const UserSignUp = () => {
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
        <UserSignUpForm
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
    t={t}
  />
)

storiesOf('Pages|Login', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <MemoryRouter>{getStory()}</MemoryRouter>)
  .add('Login Live', () => (
    <Account
      logo={Placeholder}
      primaryContent={(
        <LoginForm
          environment="live"
          onLogin={action('login')}
          onPasswordRecovery={action('recover password')}
          onChangeEnvironment={action('change environment')}
          recaptchaKey="not_a_real_key"
          t={t}
        />
      )}
      secondaryContent={LivePresentation}
      t={t}
    />
  ))
  .add('Login Test', () => (
    <Account
      logo={Placeholder}
      primaryContent={(
        <LoginForm
          environment="live"
          onLogin={action('login')}
          onPasswordRecovery={action('recover password')}
          onChangeEnvironment={action('change environment')}
          recaptchaKey="not_a_real_key"
          t={t}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))
  .add('Password Recovery Form', () => (
    <Account
      logo={Placeholder}
      primaryContent={(
        <PasswordRecoveryRequest
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
      logo={Placeholder}
      primaryContent={(
        <Confirmation
          labels={{
            backToLogin: t('back_login_action'),
            confirmation: t('pages.password_recovery.confirmation'),
            confirmationEmphasis: t('pages.password_recovery.confirmation_emphasis'),
          }}
          onBackToLogin={action('onBackToLogin')}
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
        <PasswordRecoveryReset
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
        <Confirmation
          labels={{
            backToLogin: t('back_login_action'),
            confirmation: t('pages.password_reset.confirmation'),
            confirmationEmphasis: t('pages.password_reset.confirmation_emphasis'),
          }}
          onBackToLogin={action('onBackToLogin')}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))

storiesOf('Pages|Signup', module)
  .addDecorator(withA11y)
  .add('User Signup', () => <UserSignUp />)
  .add('User Signup Confirmation', () => (
    <Account
      logo={Placeholder}
      primaryContent={(
        <UserSignUpConfirmation
          onPasswordRecovery={action('recover password')}
          onBackToLogin={action('back to login')}
          t={t}
        />
      )}
      secondaryContent={TestPresentation}
      t={t}
    />
  ))
