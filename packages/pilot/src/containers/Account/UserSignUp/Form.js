import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import { Alert, Button, FormInput } from 'former-kit'
import IconError from 'emblematic-icons/svg/CloseCircle32.svg'

import PasswordInput from '../../../components/PasswordInput'
import required from '../../../validation/required'

import styles from '../style.css'

const isRequired = t => required(t('sign_up.required'))

const SignUpInvite = ({
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
      <div className={styles.formContent}>
        <FormInput
          disabled
          label={t('email')}
          name="email"
          type="email"
        />
        <FormInput
          disabled={loading}
          label={t('sign_up.name')}
          name="name"
          type="text"
        />
        <PasswordInput
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
          disabled={loading}
          label={t('password_confirm')}
          name="passwordConfirm"
          type="password"
        />
      </div>
      { errors && errors.api && (
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
          type="submit"
          size="huge"
        >
          {t('sign_up.sign_up_action')}
        </Button>
      </div>
    </Form>
  )
}

SignUpInvite.propTypes = {
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
