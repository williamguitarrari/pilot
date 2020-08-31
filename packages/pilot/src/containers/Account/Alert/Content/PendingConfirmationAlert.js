import React from 'react'
import PropTypes from 'prop-types'
import pagarme from 'pagarme'
import classNames from 'classnames'
import style from '../style.css'

const PendingConfirmationAlert = ({
  code,
  email,
  handleStatus,
  status,
  t,
}) => {
  const sendConfirmation = async (e) => {
    e.preventDefault()
    const liveEnvironmentOptions = {
      headers: {
        'X-Live': 1,
      },
    }

    try {
      await pagarme
        .client
        .company
        .emailConfirmation(
          liveEnvironmentOptions,
          { email }
        )
      handleStatus('success')
    } catch (err) {
      handleStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={style.alert}>
        <strong>{t(`login.alert.${code}.success.message`)}</strong>
        <div className={style.alertContent}>
          {t(`login.alert.${code}.success.content`)}
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className={style.alert}>
        <strong>{t(`login.alert.${code}.error.message`)}</strong>
        <div className={style.alertContent}>
          {t(`login.alert.${code}.error.content`)}
        </div>
      </div>
    )
  }

  return (
    <div className={style.alert}>
      <strong>{t(`login.alert.${code}.initial.message`)}</strong>
      <div>
        {t(`login.alert.${code}.initial.content`)}{' '}
      </div>
      <a
        className={classNames(style.newLine, style.alertLink)}
        onClick={sendConfirmation}
        href="/"
      >
        {t(`login.alert.${code}.initial.content_link`)}
      </a>
    </div>
  )
}

PendingConfirmationAlert.propTypes = {
  code: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleStatus: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default PendingConfirmationAlert
