import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Form from 'react-vanilla-form'
import { Button, FormInput } from 'former-kit'

import isEmail from '../../../validation/email'

import styles from '../style.css'

const PasswordRecoveryRequest = ({
  errors,
  loading,
  onSubmit,
  t,
}) => (
  <>
    <span className={styles.subtitle}>
      {t('pages.password_recovery.recovery_call')}
    </span>
    <Form
      errors={errors}
      onSubmit={onSubmit}
      validation={{
        email: isEmail(t('invalid_email')),
      }}
    >
      <div className={styles.formContent}>
        <FormInput
          disabled={loading}
          placeholder={t('email_placeholder')}
          label={t('email')}
          id="name"
          name="email"
          type="email"
        />
      </div>
      <div className={styles.hugeButton}>
        <Button
          disabled={loading}
          size="huge"
          type="submit"
          fullWidth
        >
          {t('pages.password_recovery.recovery_action')}
        </Button>
      </div>
    </Form>
    <div className={styles.bottomMessage}>
      <Link className={styles.link} to="/account/login">
        {t('back_login_action')}
      </Link>
    </div>
  </>
)

PasswordRecoveryRequest.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
  }),
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

PasswordRecoveryRequest.defaultProps = {
  errors: null,
  loading: false,
}

export default PasswordRecoveryRequest
