import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import {
  Alert,
  Button,
  FormInput,
} from 'former-kit'
import IconClear from 'emblematic-icons/svg/ClearClose32.svg'

import PasswordInput from '../../../../components/PasswordInput'
import required from '../../../../validation/required'

import styles from '../../style.css'

const PasswordResetForm = ({
  base,
  errors,
  loading,
  onChange,
  onSubmit,
  t,
  validations,
}) => {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <Form
      className={styles.resetPassword}
      errors={errors}
      onChange={onChange}
      onSubmit={onSubmit}
      validation={{
        password: required(t('pages.password_reset.errors.field_required')),
        passwordConfirm: required(t('pages.password_reset.errors.field_required')),
      }}
    >
      <div className={styles.login}>
        <span className={styles.recoveryCall}>
          {t('pages.password_reset.reset_call')}
        </span>
        <PasswordInput
          base={base}
          disabled={loading}
          error={errors && errors.password}
          label={t('password')}
          name="password"
          onBlur={() => setShowPopover(false)}
          onFocus={() => setShowPopover(true)}
          showPopover={showPopover}
          t={t}
          validations={validations}
        />
        <FormInput
          base={base}
          disabled={loading}
          label={t('password_confirm')}
          type="password"
          name="passwordConfirm"
        />
        {errors && errors.api && (
          <Alert
            type="error"
            icon={<IconClear height={16} width={16} />}
          >
            {errors.api}
          </Alert>
        )}
      </div>
      <div className={styles.actions}>
        <div className={styles.hugeButton}>
          <Button
            disabled={loading}
            fill="gradient"
            loading={loading}
            size="huge"
            type="submit"
          >
            {t('pages.password_reset.reset_action')}
          </Button>
        </div>
      </div>
    </Form>
  )
}

PasswordResetForm.propTypes = {
  base: PropTypes.oneOf(['dark', 'light']).isRequired,
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

PasswordResetForm.defaultProps = {
  errors: null,
  loading: false,
}

export default PasswordResetForm
