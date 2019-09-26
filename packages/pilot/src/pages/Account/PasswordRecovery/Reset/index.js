import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { validate } from 'p4g4rm3'
import {
  applySpec,
  compose,
  isEmpty,
  mergeLeft,
  pipe,
  prop,
} from 'ramda'
import pagarme from 'pagarme'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'

import buildParamErrors from '../../Login/buildParamErrors'

import {
  PasswordResetForm,
} from '../../../../containers/Account/PasswordRecovery/Reset'

const enhance = compose(
  translate(),
  withRouter
)

const Reset = ({
  base,
  history: {
    replace,
  },
  match: {
    params: {
      token,
    },
  },
  t,
}) => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [validations, setValidations] = useState({
    errors: [],
  })

  const validateInputs = ({ password, passwordConfirm }) => {
    const score = validate(password)

    let validationErrors = {}
    if (password !== passwordConfirm) {
      const passwordsNotMatching = t('pages.password_reset.errors.passwords_dont_match')

      validationErrors = {
        passwordConfirm: passwordsNotMatching,
      }
    }

    if (!score.isValid) {
      const weakPassword = t('pages.password_reset.errors.invalid_password')

      validationErrors = mergeLeft({
        password: weakPassword,
      }, errors)
    }

    setErrors(validationErrors)
    setValidations(score)
  }

  const onBackToLogin = () => replace('/account/login')

  const onSubmit = ({ password, passwordConfirm }) => {
    validateInputs({
      password,
      passwordConfirm,
    })

    if (isEmpty(errors)) {
      setLoading(true)

      pagarme.user.redefinePassword({}, {
        password,
        token,
      })
        .then(() => replace('/account/password/reset/confirmation'))
        .catch((err) => {
          setLoading(false)

          const getApiError = pipe(
            buildParamErrors,
            applySpec({
              api: prop('null'),
              password: prop('password'),
            })
          )

          setErrors(getApiError(err))
        })
    }
  }

  return (
    <PasswordResetForm
      base={base}
      errors={errors}
      loading={loading}
      onBackToLogin={onBackToLogin}
      onChange={validateInputs}
      onSubmit={onSubmit}
      t={t}
      validations={validations}
    />
  )
}

Reset.propTypes = {
  base: PropTypes.oneOf(['dark', 'light']).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhance(Reset)
