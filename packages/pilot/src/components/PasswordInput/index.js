import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { contains } from 'ramda'
import {
  Popover,
  PopoverContent,
} from 'former-kit'

import Input from '../../containers/Account/ui/Input'
import style from './style.css'

const getStrengthClassnames = ({ isValid, score }) => classnames({
  [style.strong]: score === 4 && isValid,
  [style.moderated]: score === 3 && isValid,
  [style.weak]: score === 2 && isValid,
  [style.veryWeak]: score === 1 && isValid,
  [style.invalid]: !isValid,
})

const renderPopoverContent = (t, validations) => {
  const isValid = prop => ({
    [style.valid]: !contains(prop, validations.errors),
  })

  const minLengthRule = classnames(isValid('min_length'))
  const maxLengthRule = classnames(isValid('max_length'))

  return (
    <PopoverContent>
      <div className={style.info}>
        <strong>{ t('password_rules_title') }</strong>
        <span className={minLengthRule}>
          { t('password_rules_min_length', { length: 8 }) }
        </span>

        <span className={maxLengthRule}>
          { t('password_rules_max_length', { length: 64 }) }
        </span>

        <strong>{ t('password_strength') }</strong>
        <div className={style.strength}>
          <div className={getStrengthClassnames(validations)} />
        </div>
      </div>
    </PopoverContent>
  )
}

const PasswordInput = ({
  disabled,
  error,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  placement,
  showPopover,
  t,
  validations,
  value,
}) => (
  <div className={style.container}>
    <Popover
      content={renderPopoverContent(t, validations)}
      closeWhenClickOutside={false}
      onClick={onFocus}
      onClickOutside={onBlur}
      placement={placement}
      visible={showPopover}
    >
      <Input
        disabled={disabled}
        error={error}
        label={label}
        name={name}
        id={name}
        onChange={onChange}
        type="password"
        placeholder={placeholder}
        value={value}
      />
    </Popover>
  </div>
)

PasswordInput.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  placement: PropTypes.string,
  showPopover: PropTypes.bool,
  t: PropTypes.func.isRequired,
  validations: PropTypes.shape({
    errors: PropTypes.array,
    isValid: PropTypes.bool,
    score: PropTypes.oneOf([
      0, 1, 2, 3, 4,
    ]),
  }),
  value: PropTypes.string,
}

PasswordInput.defaultProps = {
  disabled: false,
  error: '',
  name: '',
  onChange: null,
  onFocus: null,
  placement: 'bottomCenter',
  showPopover: false,
  validations: {
    errors: [],
  },
  value: '',
}

export default PasswordInput
