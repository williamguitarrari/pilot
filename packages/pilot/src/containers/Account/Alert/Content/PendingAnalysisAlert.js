import React from 'react'
import PropTypes from 'prop-types'
import style from '../style.css'
import { testUrl } from '../../../../environment'

const PendingAnalysisAlert = ({ code, t }) => (
  <div className={style.alert}>
    <strong>{t(`login.alert.${code}.message`)}</strong>
    <div>
      {t(`login.alert.${code}.content`)}{' '}
      <a
        className={style.alertLink}
        href={testUrl}
      >
        {t(`login.alert.${code}.content_link`)}
      </a>
    </div>
  </div>
)

PendingAnalysisAlert.propTypes = {
  code: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default PendingAnalysisAlert
