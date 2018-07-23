import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'former-kit'
import ErrorIcon from './ErrorIcon.svg'
import style from './style.css'

const TransferError = ({
  actionLabel,
  message,
  onClick,
}) => (
  <div className={style.container}>
    <ErrorIcon />
    <p className={style.message}>{message}</p>
    <Button
      fill="gradient"
      onClick={onClick}
    >
      {actionLabel}
    </Button>
  </div>
)

TransferError.propTypes = {
  actionLabel: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TransferError
