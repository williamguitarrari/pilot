import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import { Button } from 'former-kit'
import Input from '../ui/Input'

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
        <Input
          disabled={loading}
          placeholder="seuemail@provedor.com.br"
          label="Email"
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
        >
          {t('pages.password_recovery.recovery_action')}
        </Button>
      </div>
    </Form>
    <div className={styles.bottomMessage}>
      <a className={styles.link} href="#/account/login">
        {t('back_login_action')}
      </a>
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
