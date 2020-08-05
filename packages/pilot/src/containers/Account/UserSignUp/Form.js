import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-vanilla-form'
import styled from 'styled-components'
import { Button } from 'former-kit'
import Alert from '../ui/Alert'
import Input from '../ui/Input'

import PasswordInput from '../../../components/PasswordInput'
import required from '../../../validation/required'

const isRequired = t => required(t('sign_up.required'))

const SignupFormContainer = styled.div`
  & > div {
    margin-bottom: 36px;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`

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
      <SignupFormContainer>
        <Input
          disabled
          label={t('email')}
          name="email"
          type="email"
        />
        <Input
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
        <Input
          disabled={loading}
          label={t('password_confirm')}
          name="passwordConfirm"
          type="password"
        />
        <ActionsContainer>
          { errors && errors.api && (
          <Alert severity="error">
            {errors.api}
          </Alert>
          )}
          <Button
            disabled={loading}
            type="submit"
            size="huge"
          >
            {t('sign_up.sign_up_action')}
          </Button>
        </ActionsContainer>
      </SignupFormContainer>
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
