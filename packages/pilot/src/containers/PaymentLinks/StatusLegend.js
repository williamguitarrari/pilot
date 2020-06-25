import React from 'react'
import PropTypes from 'prop-types'
import {
  Legend,
} from 'former-kit'
import paymentLinkStatus from '../../models/paymentLinkStatusLegends'
import styles from './styles.css'

const StatusLegend = ({ status, t }) => {
  const statusText = t(paymentLinkStatus[status].text)

  return (
    <div className={styles.centralizedItem}>
      <Legend
        acronym={statusText}
        color={paymentLinkStatus[status].color}
        hideLabel
        textColor={paymentLinkStatus[status].textColor}
        textFormat="capitalize"
      >
        {statusText}
      </Legend>
    </div>
  )
}

StatusLegend.propTypes = {
  status: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default StatusLegend
