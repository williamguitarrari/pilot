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

const CompanySignup = lazy(() => import(
  /* webpackChunkName: "company-signup" */ './SignUp/Company'
))

const CompanySignupConfirmation = lazy(() => import(
  /* webpackChunkName: "company-signup-confirmation" */ './SignUp/Company/Confirmation'
))

const UserSignUp = lazy(() => import(
  /* webpackChunkName: "user-signup" */ './SignUp/User'
))

const UserSignupConfirmation = lazy(() => import(
  /* webpackChunkName: "user-signup-confirmation" */ './SignUp/User/Confirmation'
))

export {
  Login,
  PasswordRecovery,
  PasswordRecoveryConfirmation,
  PasswordReset,
  PasswordResetConfirmation,
  CompanySignup,
  CompanySignupConfirmation,
  UserSignUp,
  UserSignupConfirmation,
}
