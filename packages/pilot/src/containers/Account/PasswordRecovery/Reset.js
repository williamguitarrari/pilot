import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Form from 'react-vanilla-form'
import { Alert, Button, FormInput } from 'former-kit'
import IconError from 'emblematic-icons/svg/CloseCircle32.svg'

import required from '../../../validation/required'
import PasswordInput from '../../../components/PasswordInput'
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
        <div className={styles.formContent}>
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
          <FormInput
            disabled={loading}
            label={t('password_confirm')}
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="•••••••••••••"
          />
        </div>
        {errors && errors.api && (
        <Alert
          type="error"
          icon={<IconError height={16} width={16} />}
        >
          {errors.api}
        </Alert>
        )}
        <div className={styles.confirmButton}>
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
          <Link className={styles.link} to="/account/login">
            {t('back_login_action')}
          </Link>
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
