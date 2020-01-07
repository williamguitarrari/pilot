import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'former-kit'
import ErrorIcon from './ErrorIcon.svg'
import style from './style.css'

const TransferError = ({
  actionLabel,
  message,
  onClick,
  title,
}) => (
  <div className={style.container}>
    <h2 className={style.title}>{title}</h2>
    <p className={style.message}>{message}</p>
    <ErrorIcon />
    <div className={style.buttonWrapper}>
      <Button
        fill="gradient"
        onClick={onClick}
      >
        {actionLabel}
      </Button>
    </div>
  </div>
)

TransferError.propTypes = {
  actionLabel: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
}

TransferError.defaultProps = {
  title: null,
}

export default TransferError
