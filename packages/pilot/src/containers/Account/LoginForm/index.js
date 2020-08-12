import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import IconCode from 'emblematic-icons/svg/Code24.svg'
import IconError from 'emblematic-icons/svg/CloseCircle32.svg'
import { Alert, FormInput, Button } from 'former-kit'

import styles from '../style.css'

const LoginForm = ({
  environment,
  errors,
  loading,
  onLogin,
  onPasswordRecovery,
  oppositeEnvironmentUrl,
  recaptchaKey,
  t,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  })
  const recaptchaRef = useRef()

  const isLive = environment === 'live'

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

  const handleLoginActionOnClick = async (e) => {
    e.preventDefault()

    recaptchaRef.current.reset()

    const result = validate()
    if (result) {
      return setFormErrors(result)
    }

    setFormErrors({ email: null, password: null })

    const recaptchaToken = await recaptchaRef.current.executeAsync()

    return onLogin({ email, password, recaptchaToken })
  }

  return (
    <>
      <form
        onSubmit={handleLoginActionOnClick}
      >
        <div className={styles.formContent}>
          <FormInput
            disabled={loading}
            placeholder={t('email_placeholder')}
            label={t('email')}
            id="name"
            name="email"
            type="email"
            value={email}
            onChange={v => setEmail(v.target.value)}
            error={formErrors.email}
          />
          <FormInput
            disabled={loading}
            placeholder="•••••••••••••"
            label={t('password')}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={v => setPassword(v.target.value)}
            error={formErrors.password}
          />
        </div>
        {errors
            && (
              <Alert
                type="error"
                icon={<IconError height={16} width={16} />}
              >
                {errors.null
                  ? errors.null
                  : t('login.network_error')
              }
              </Alert>
            )
          }
        <ReCAPTCHA
          badge="bottomleft"
          ref={recaptchaRef}
          sitekey={recaptchaKey}
          size="invisible"
        />
        <div className={styles.confirmButton}>
          <Button
            type="submit"
            disabled={loading}
            size="huge"
            relevance={isLive ? 'normal' : 'high'}
          >
            {t('login.login_action')}
          </Button>
          <button
            className={styles.forgotPassword}
            role="link"
            disabled={loading}
            onClick={onPasswordRecovery}
            type="button"
          >
            {t('login.forgot_password')}
          </button>
        </div>
      </form>
      <div className={styles.bottomMessage}>
        <span>{t('landing.signup_call')}</span>
        <a className={styles.link} href="https://pagar.me/precos">
          {t('landing.signup_action')}
        </a>
      </div>
      <a
        className={styles.changeEnvButton}
        href={oppositeEnvironmentUrl}
      >
        <Button
          icon={isLive ? <IconCode /> : null}
          disabled={loading}
          size="huge"
          fill="outline"
          fullWidth
        >
          {t(`landing.${environment}.back_button`)}
        </Button>
      </a>
    </>
  )
}

LoginForm.propTypes = {
  environment: PropTypes.oneOf(['live', 'test']).isRequired,
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
  oppositeEnvironmentUrl: PropTypes.string.isRequired,
  recaptchaKey: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

LoginForm.defaultProps = {
  errors: null,
  loading: false,
}

export default LoginForm
