import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import IconCode from 'emblematic-icons/svg/Code24.svg'
import { Button } from 'former-kit'
import styled from 'styled-components'
import Input from '../ui/Input'
import Alert from '../ui/Alert'

import styles from '../style.css'

const ForgetPassword = styled.button`
  cursor: pointer;
  position: absolute;
  margin-bottom: 8px;
  font-size: 14px;
  top: 0;
  right: 0;
  z-index: 2;
`

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`

const LoginForm = ({
  environment,
  errors,
  loading,
  onChangeEnvironment,
  onLogin,
  onPasswordRecovery,
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
          <Input
            disabled={loading}
            placeholder="seuemail@provedor.com.br"
            label="Email"
            id="name"
            name="email"
            type="email"
            value={email}
            onChange={v => setEmail(v.target.value)}
            error={formErrors.email}
          />
          <div className={styles.passwordBox}>
            <ForgetPassword
              role="link"
              disabled={loading}
              onClick={onPasswordRecovery}
              type="button"
            >
              {t('login.forgot_password')}
            </ForgetPassword>
            <Input
              disabled={loading}
              placeholder="•••••••••••••"
              label="Senha"
              id="password"
              name="password"
              type="password"
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
        <ActionsContainer>
          {errors
            && (
            <Alert severity="error">
              {errors.null
                ? errors.null
                : t('login.network_error')
              }
            </Alert>
            )
          }
          <Button
            type="submit"
            disabled={loading}
            size="huge"
            relevance={isLive ? 'normal' : 'high'}
          >
            {t('login.login_action')}
          </Button>
        </ActionsContainer>
      </form>
      <div className={styles.bottomMessage}>
        <span>{t('landing.signup_call')}</span>
        <a className={styles.link} href="https://pagar.me/precos">
          {t('landing.signup_action')}
        </a>
      </div>
      <div className={styles.changeEnvButton}>
        <Button
          icon={isLive ? <IconCode /> : null}
          disabled={loading}
          onClick={onChangeEnvironment}
          size="huge"
          fill="outline"
        >
          {t(`landing.${environment}.back_button`)}
        </Button>
      </div>
    </>
  )
}

LoginForm.propTypes = {
  environment: PropTypes.string.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    PropTypes.instanceOf(Error),
  ]),
  loading: PropTypes.bool,
  onChangeEnvironment: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onPasswordRecovery: PropTypes.func.isRequired,
  recaptchaKey: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

LoginForm.defaultProps = {
  errors: null,
  loading: false,
}

export default LoginForm
