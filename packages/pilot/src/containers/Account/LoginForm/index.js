import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import classnames from 'classnames'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import IconError from 'emblematic-icons/svg/ClearClose32.svg'
import IconCode from 'emblematic-icons/svg/Code24.svg'
import {
  Button,
  Input,
  Alert,
} from 'former-kit'
import { recaptchaKey } from '../../../environment'

import styles from '../style.css'
import localStyles from './style.css'

const LoginForm = ({
  env,
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
    if (!recaptchaToken) {
      return
    }
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
    <>
      <form
        onSubmit={handleLoginActionOnClick}
      >
        <div className={styles.formContent}>
          <div className={styles.formGroup}>
            <div className={styles.label}>{t('email')}</div>
            <Input
              className={styles.inputField}
              disabled={loading}
              name="email"
              type="email"
              value={email}
              onChange={v => setEmail(v.target.value)}
              error={formErrors.email}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={localStyles.passwordTopDeco}>
              <div className={styles.label}>{t('password')}</div>
              <button
                className={styles.label}
                role="link"
                disabled={loading}
                onClick={onPasswordRecovery}
                type="button"
              >
                {t('login.forgot_password')}
              </button>
            </div>
            <Input
              className={styles.inputField}
              disabled={loading}
              type="password"
              name="password"
              value={password}
              onChange={v => setPassword(v.target.value)}
              error={formErrors.password}
            />
          </div>
        </div>
        <ReCAPTCHA
          badge="bottomleft"
          ref={recaptchaRef}
          sitekey={recaptchaKey}
          size="invisible"
          onChange={recaptchaOnChange}
        />
        {errors
          && (
            <div className={styles.errorAlert}>
              <Alert
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
        <div className={classnames(styles.actions, styles.formGroup)}>
          <div className={styles.hugeButton}>
            <Button
              type="submit"
              disabled={loading}
              size="huge"
            >
              {t('login.login_action')}
            </Button>
          </div>
        </div>
      </form>
      <div className={localStyles.bottomMessage}>
        <p>{t('landing.signup_call')}</p>
        <a className={styles.link} href="https://pagar.me/precos">
          {t('landing.signup_action')}
        </a>
      </div>
      <Button
        icon={<IconCode />}
        disabled={loading}
        size="huge"
        fill="outline"
      >
        {t(`landing.${env}.back_button`)}
      </Button>
    </>
  )
}

LoginForm.propTypes = {
  env: PropTypes.string.isRequired,
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

LoginForm.defaultProps = {
  errors: null,
  loading: false,
}

export default LoginForm
