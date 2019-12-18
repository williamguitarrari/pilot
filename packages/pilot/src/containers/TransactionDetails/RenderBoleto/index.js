import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

import PaymentBoleto from '../../../components/PaymentBoleto'

const RenderBoleto = ({
  boleto,
  onCopyBoletoUrl,
  onShowBoleto,
  paymentBoletoLabels,
}) => {
  const {
    barcode,
    due_date, //  eslint-disable-line camelcase
  } = boleto

  return (
    <PaymentBoleto
      barcode={barcode}
      copyBarcodeFeedback={paymentBoletoLabels.feedback}
      copyBarcodeLabel={paymentBoletoLabels.copy}
      dueDate={moment(due_date).format('L')}
      dueDateLabel={paymentBoletoLabels.due_date}
      onCopy={onCopyBoletoUrl}
      onShow={onShowBoleto}
      showBoletoLabel={paymentBoletoLabels.show}
      title={paymentBoletoLabels.title}
    />
  )
}

RenderBoleto.propTypes = {
  boleto: PropTypes.shape({
    barcode: PropTypes.string,
    due_date: PropTypes.instanceOf(moment),
  }).isRequired,
  onCopyBoletoUrl: PropTypes.func,
  onShowBoleto: PropTypes.func,
  paymentBoletoLabels: PropTypes.shape({
    copy: PropTypes.string,
    due_date: PropTypes.string,
    feedback: PropTypes.string,
    show: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
}

RenderBoleto.defaultProps = {
  onCopyBoletoUrl: null,
  onShowBoleto: null,
}

export default RenderBoleto
