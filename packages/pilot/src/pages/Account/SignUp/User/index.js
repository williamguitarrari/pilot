import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import {
  compose,
  isEmpty,
  isNil,
  mergeLeft,
  pipe,
  replace,
  tail,
  unless,
} from 'ramda'
import { validate } from 'p4g4rm3'
import qs from 'qs'
import pagarme from 'pagarme'
import buildParamErrors from '../../Login/buildParamErrors'

import { SignUpInviteForm } from '../../../../containers/Account/SignUp'

const enhanced = compose(
  translate(),
  withRouter
)

const getData = pipe(
  tail,
  qs.parse
)

const formatEmail = unless(isNil, replace(
  /\s/g,
  '+'
))

const SignUpInvitePage = ({
  base,
  history,
  t,
}) => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [passwordValidations, setPasswordValidations] = useState({
    errors: [],
  })

  const { email, token } = getData(history.location.search)

  useEffect(() => {
    if (!token || !email) {
      history.replace('/account/login')
    }
  }, [email, history, token])

  const validateInputs = ({ password = '', passwordConfirm = '' }) => {
    const validations = validate(password)

    let newErrors = {}
    if (password !== passwordConfirm) {
      newErrors = mergeLeft({
        passwordConfirm: t('pages.password_reset.errors.passwords_dont_match'),
      }, errors)
    }

    setErrors(newErrors)
    setPasswordValidations(validations)
  }

  const handleSubmit = (data, validationErrors) => {
    validateInputs(data)
    const {
      isValid,
      score,
    } = passwordValidations

    if (!isValid || score < 2) {
      const weakPassword = t('pages.password_reset.errors.weak_password')

      setErrors({
        password: weakPassword,
        passwordConfirm: weakPassword,
      })

      return
    }

    if (isEmpty(errors) && !validationErrors) {
      setLoading(true)

      const getEmailToken = {
        ...data,
        email: formatEmail(email),
        invite_token: token,
      }

      pagarme.client.user.create({}, getEmailToken)
        .then(() => history.replace('/account/signup/invite/confirmation'))
        .catch((error) => {
          const buildErrors = pipe(
            buildParamErrors,
            obj => ({
              ...obj,
              api: obj.null,
            })
          )

          const apiErrors = buildErrors(error)
          setLoading(false)
          setErrors(mergeLeft(apiErrors, errors))
        })
    }
  }

  return (
    <SignUpInviteForm
      base={base}
      errors={errors}
      loading={loading}
      onChange={validateInputs}
      onSubmit={handleSubmit}
      t={t}
      email={formatEmail(email)}
      passwordValidations={passwordValidations}
    />
  )
}

SignUpInvitePage.propTypes = {
  base: PropTypes.oneOf(['dark', 'light']).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(SignUpInvitePage)
