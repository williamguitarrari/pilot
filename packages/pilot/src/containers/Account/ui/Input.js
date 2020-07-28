import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import MUIFormControl from '@material-ui/core/FormControl'
import MUIFormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import MUIInputBase from '@material-ui/core/InputBase'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const FormHelperText = styled(props => <MUIFormHelperText {...props} />)`
  &.MuiFormHelperText-root.Mui-error {
    color: #df285f;
    font-family: Lato;
  }
`

const InputBase = styled(props => <MUIInputBase {...props} />)`
  width: 100%;

  &.MuiInputBase-root {
    border: 1px solid #a8a8ad;
    border-radius: 6px;
  }

  .MuiInputBase-input {
    border-radius: 6px;
    color: #8b8b92;
    font-family: Lato;
    font-size: 14px;
    padding: 18px 16px;
  }

  .MuiInputBase-input::placeholder {
    color: #8b8b92;
  }

  &.Mui-focused {
    border-color: #595a63;

    .MuiInputBase-input {
      color: #72737a;
    }
  }

  &.Mui-disabled {
    border-color: #cdcdd0;

    .MuiInputBase-input {
      color: #cdcdd0;
    }
  }

  &.Mui-error {
    border-color: #df285f;
  }
`

const Label = styled(props => <InputLabel {...props} />)`
  &.MuiInputLabel-root {
    color: #595a63;
    font-family: Lato;
    font-size: 14px;
    margin-bottom: 8px;
  }

  &.MuiFormLabel-root.Mui-error {
    color: #df285f;
  }

  &.MuiFormLabel-root.Mui-focused {
    color: #595a63;
  }
`

const FormControl = styled(props => <MUIFormControl {...props} />)`
  width: 100%;

  &.MuiFormControl-root {
    display: unset;
    position: unset;
    ${props => props.customStyle}
  }

  & > .MuiInputLabel-formControl {
    position: unset;
    transform: unset;
  }
`

const Input = ({
  disabled,
  error,
  id,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormControl error={!!error}>
      <Label shrink htmlFor={id}>{label}</Label>
      <InputBase
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        name={name}
        type={showPassword ? 'text' : type}
        value={value}
        endAdornment={type === 'password' && (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
        )}
        onChange={onChange}
      />
      {error && (
      <FormHelperText>
        {error}
      </FormHelperText>
      )}
    </FormControl>
  )
}

Input.propTypes = {
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

Input.defaultProps = {
  error: null,
}

export default Input
