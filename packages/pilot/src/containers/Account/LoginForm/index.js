import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import IconError from 'emblematic-icons/svg/ClearClose32.svg'
import {
  Button,
  FormInput,
  Alert,
} from 'former-kit'
import { recaptchaKey } from '../../../environment'

import styles from '../style.css'

const LoginContainer = ({
  base,
  errors,
  loading,
  onLogin,
  onPasswordRecovery,
  t,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  })
  const recaptchaRef = useRef()

  const recaptchaOnChange = (recaptchaToken) => {
    onLogin({ email, password, recaptchaToken })
  }

  const validate = () => {
    const validationErrors = {}
    if (!isEmail(email)) {
      validationErrors.email = t('invalid_email')
    }
    if (isEmpty(password)) {
      validationErrors.password = t('empty_password')
    }
    if (Object.keys(validationErrors).length > 0) {
      return validationErrors
    }
    return null
  }

  const handleLoginActionOnClick = (e) => {
    e.preventDefault()

    const result = validate()
    if (result) {
      setFormErrors(result)
      return
    }

    setFormErrors({ email: null, password: null })

    const recaptchaToken = recaptchaRef.current.getValue()
    if (!recaptchaToken) {
      recaptchaRef.current.execute()
      return
    }

    onLogin({ email, password, recaptchaToken })
  }

  return (
    <form
      onSubmit={handleLoginActionOnClick}
    >
      <div className={styles.formContent}>
        <FormInput
          base={base}
          disabled={loading}
          label={t('email')}
          name="email"
          type="email"
          value={email}
          onChange={v => setEmail(v.target.value)}
          error={formErrors.email}
        />
        <FormInput
          base={base}
          disabled={loading}
          type="password"
          label={t('password')}
          name="password"
          value={password}
          onChange={v => setPassword(v.target.value)}
          error={formErrors.password}
        />
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={recaptchaKey}
        size="invisible"
        onChange={recaptchaOnChange}
      />
      {errors
        && (
          <div className={styles.errorAlert}>
            <Alert
              base={base}
              type="error"
              icon={<IconError height={16} width={16} />}
            >
              <span>
                {errors.null
                  ? errors.null
                  : t('login.network_error')
              }
              </span>
            </Alert>
          </div>
        )
      }
      <div className={styles.actions}>
        <div className={styles.hugeButton}>
          <Button
            type="submit"
            disabled={loading}
            size="huge"
          >
            {t('login.login_action')}
          </Button>
        </div>
        <button
          role="link"
          disabled={loading}
          onClick={onPasswordRecovery}
          type="button"
        >
          {t('login.password_recovery_action')}
        </button>
      </div>
    </form>
  )
}

LoginContainer.propTypes = {
  base: PropTypes.oneOf(['dark', 'light']).isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    PropTypes.instanceOf(Error),
  ]),
  loading: PropTypes.bool,
  onLogin: PropTypes.func.isRequired,
  onPasswordRecovery: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

LoginContainer.defaultProps = {
  errors: null,
  loading: false,
}

export default LoginContainer
