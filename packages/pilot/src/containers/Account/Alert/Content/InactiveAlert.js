import React from 'react'
import PropTypes from 'prop-types'
import style from '../style.css'

const InactiveAlert = ({ code, t }) => (
  <div className={style.alert}>
    <strong>{t(`login.alert.${code}.message`)}</strong>
    <div className={style.alertContent}>
      {t(`login.alert.${code}.content`)}
    </div>
  </div>
)

InactiveAlert.propTypes = {
  code: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default InactiveAlert
