import React from 'react'
import PropTypes from 'prop-types'

const AlertInfo = ({
  alertLabels,
  boletoWarningMessage,
  isBoletoWaitingPayment,
}) => {
  if (isBoletoWaitingPayment) {
    return (
      <span>
        {boletoWarningMessage}
      </span>
    )
  }
  return (
    <span>
      <strong> {alertLabels.chargeback_reason_label} </strong>
      <span> {alertLabels.chargeback_reason} </span>
      <strong>
        {alertLabels.reason_code}
      </strong>
    </span>
  )
}

AlertInfo.propTypes = {
  alertLabels: PropTypes.shape({
    chargeback_reason: PropTypes.string,
    chargeback_reason_label: PropTypes.string,
    reason_code: PropTypes.string,
  }).isRequired,
  boletoWarningMessage: PropTypes.string.isRequired,
  isBoletoWaitingPayment: PropTypes.bool.isRequired,
}

export default AlertInfo
