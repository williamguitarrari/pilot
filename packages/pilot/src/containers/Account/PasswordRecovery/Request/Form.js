import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import classNames from 'classnames'
import {
  Button,
  FormInput,
} from 'former-kit'

import isEmail from '../../../../validation/email'

import styles from '../../style.css'

const PasswordRecoveryForm = ({
  base,
  errors,
  loading,
  onBackToLogin,
  onSubmit,
  t,
}) => (
  <Form
    errors={errors}
    onSubmit={onSubmit}
    validation={{
      email: isEmail(t('invalid_email')),
    }}
  >
    <div className={classNames(styles.formContent, styles.passwordRecovery)}>
      <span className={classNames(styles.uppercase, styles.actionCall)}>
        {t('pages.password_recovery.recovery_call')}
      </span>
      <FormInput
        base={base}
        className={styles.input}
        disabled={loading}
        label={t('email')}
        name="email"
        type="email"
      />
    </div>
    <div className={styles.actions}>
      <div className={styles.hugeButton}>
        <Button
          disabled={loading}
          size="huge"
          type="submit"
        >
          {t('pages.password_recovery.recovery_action')}
        </Button>
      </div>
      <button
        disabled={loading}
        onClick={onBackToLogin}
        role="link"
        type="button"
      >
        {t('back_login_action')}
      </button>
    </div>
  </Form>
)

PasswordRecoveryForm.propTypes = {
  base: PropTypes.oneOf(['dark', 'light']).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
  }),
  loading: PropTypes.bool,
  onBackToLogin: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

PasswordRecoveryForm.defaultProps = {
  errors: null,
  loading: false,
}

export default PasswordRecoveryForm
