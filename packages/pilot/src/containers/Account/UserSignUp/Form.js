import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import ClearIcon from 'emblematic-icons/svg/ClearClose32.svg'
import className from 'classnames'
import {
  Alert,
  Button,
  FormInput,
} from 'former-kit'

import styles from '../style.css'

import PasswordInput from '../../../components/PasswordInput'
import required from '../../../validation/required'

const isRequired = t => required(t('sign_up.required'))

const SignUpInvite = ({
  base,
  email,
  errors,
  loading,
  onChange,
  onSubmit,
  passwordValidations,
  t,
}) => {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <Form
      errors={errors}
      validation={{
        name: isRequired(t),
        password: isRequired(t),
        passwordConfirm: isRequired(t),
      }}
      onChange={onChange}
      onSubmit={onSubmit}
      data={{ email }}
    >
      <div className={className(styles.formContent, styles.signup)}>
        <FormInput
          base={base}
          disabled
          label={t('email')}
          name="email"
          type="email"
        />
        <FormInput
          base={base}
          disabled={loading}
          label={t('sign_up.name')}
          name="name"
          type="text"
        />
        <PasswordInput
          base={base}
          disabled={loading}
          label={t('password')}
          name="password"
          onBlur={() => setShowPopover(false)}
          onFocus={() => setShowPopover(true)}
          showPopover={showPopover}
          t={t}
          validations={passwordValidations}
        />
        <FormInput
          base={base}
          disabled={loading}
          label={t('password_confirm')}
          name="passwordConfirm"
          type="password"
        />
        <div className={styles.error}>
          { errors && errors.api && (
            <Alert
              base={base}
              type="error"
              icon={<ClearIcon height={16} width={16} />}
            >
              {errors.api}
            </Alert>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.hugeButton}>
          <Button
            disabled={loading}
            type="submit"
            size="huge"
          >
            {t('sign_up.sign_up_action')}
          </Button>
        </div>
      </div>
    </Form>
  )
}

SignUpInvite.propTypes = {
  base: PropTypes.oneOf(['dark', 'light']).isRequired,
  email: PropTypes.string.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
      password: PropTypes.string,
    }),
    PropTypes.instanceOf(Error),
  ]),
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  passwordValidations: PropTypes.shape({
    errors: PropTypes.array,
    isValid: PropTypes.bool,
    score: PropTypes.oneOf([
      0, 1, 2, 3, 4,
    ]),
  }).isRequired,
  t: PropTypes.func.isRequired,
}

SignUpInvite.defaultProps = {
  errors: null,
  loading: false,
}

export default SignUpInvite
