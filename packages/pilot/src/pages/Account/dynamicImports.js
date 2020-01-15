import { lazy } from 'react'

const Login = lazy(() => import(
  /* webpackChunkName: "login" */ './Login'
))

const PasswordRecovery = lazy(() => import(
  /* webpackChunkName: "password-recovery" */ './PasswordRecovery/Request'
))

const PasswordRecoveryConfirmation = lazy(() => import(
  /* webpackChunkName: "password-recovery-confirmation" */ './PasswordRecovery/Request/Confirmation'
))

const PasswordReset = lazy(() => import(
  /* webpackChunkName: "password-reset" */ './PasswordRecovery/Reset'
))

const PasswordResetConfirmation = lazy(() => import(
  /* webpackChunkName: "password-reset-confirmation" */ './PasswordRecovery/Reset/Confirmation'
))

const UserSignUp = lazy(() => import(
  /* webpackChunkName: "user-signup" */ './UserSignUp'
))

const UserSignUpConfirmation = lazy(() => import(
  /* webpackChunkName: "user-signup-confirmation" */ './UserSignUp/Confirmation'
))

export {
  Login,
  PasswordRecovery,
  PasswordRecoveryConfirmation,
  PasswordReset,
  PasswordResetConfirmation,
  UserSignUp,
  UserSignUpConfirmation,
}
