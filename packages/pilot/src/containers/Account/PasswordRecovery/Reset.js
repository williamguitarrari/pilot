import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import { Button } from 'former-kit'

import required from '../../../validation/required'
import PasswordInput from '../../../components/PasswordInput'
import Alert from '../ui/Alert'
import Input from '../ui/Input'
import styles from '../style.css'

const PasswordRecoveryReset = ({
  errors,
  loading,
  onChange,
  onSubmit,
  t,
  validations,
}) => {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <>
      <span className={styles.subtitle}>
        {t('pages.password_reset.reset_call')}
      </span>
      <Form
        errors={errors}
        onChange={onChange}
        onSubmit={onSubmit}
        validation={{
          password: required(t('pages.password_reset.errors.field_required')),
          passwordConfirm: required(t('pages.password_reset.errors.field_required')),
        }}
      >
        <PasswordInput
          disabled={loading}
          label={t('password')}
          type="password"
          name="password"
          placeholder="•••••••••••••"
          onBlur={() => setShowPopover(false)}
          onFocus={() => setShowPopover(true)}
          showPopover={showPopover}
          t={t}
          validations={validations}
        />
        <div className={styles.passwordBox}>
          <Input
            disabled={loading}
            label={t('password_confirm')}
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="•••••••••••••"
          />
        </div>
        <div className={styles.errorAlert}>
          {errors && errors.api && (
          <Alert severity="error">
            {errors.api}
          </Alert>
          )}
        </div>
        <div className={styles.hugeButton}>
          <Button
            disabled={loading}
            loading={loading}
            size="huge"
            type="submit"
          >
            {t('pages.password_reset.reset_action')}
          </Button>
        </div>
        <div className={styles.bottomMessage}>
          <a className={styles.link} href="#/account/login">
            {t('back_login_action')}
          </a>
        </div>
      </Form>
    </>
  )
}

PasswordRecoveryReset.propTypes = {
  errors: PropTypes.shape({
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
  }),
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  validations: PropTypes.shape({
    errors: PropTypes.array,
    isValid: PropTypes.bool,
    score: PropTypes.oneOf([
      0, 1, 2, 3, 4,
    ]),
  }).isRequired,
}

PasswordRecoveryReset.defaultProps = {
  errors: null,
  loading: false,
}

export default PasswordRecoveryReset
