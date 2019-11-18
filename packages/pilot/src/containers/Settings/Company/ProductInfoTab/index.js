import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import BoletoForm from '../../Boleto/Form'
import Antifraud from '../../Antifraud'

const ProductInfo = ({
  antifraud,
  boletoActionsDisabled,
  boletoDaysToAddInExpirationDate,
  boletoDisabled,
  boletoHandleCancel,
  boletoHandleChange,
  boletoHandleSubmit,
  boletoInstructions,
  boletoInstructionsOptions,
  t,
}) => (
  <Fragment>
    <BoletoForm
      actionsDisabled={boletoActionsDisabled}
      daysToAddInExpirationDate={boletoDaysToAddInExpirationDate}
      disabled={boletoDisabled}
      instructions={boletoInstructions}
      instructionsOptions={boletoInstructionsOptions}
      onCancel={boletoHandleCancel}
      onChange={boletoHandleChange}
      onSubmit={boletoHandleSubmit}
      t={t}
    />

    {antifraud.fraud_covered && <Antifraud t={t} />}
  </Fragment>
)

ProductInfo.propTypes = {
  antifraud: PropTypes.shape({
    fraud_covered: PropTypes.bool.isRequired,
  }).isRequired,
  boletoActionsDisabled: PropTypes.bool.isRequired,
  boletoDaysToAddInExpirationDate: PropTypes.string.isRequired,
  boletoDisabled: PropTypes.bool.isRequired,
  boletoHandleCancel: PropTypes.func.isRequired,
  boletoHandleChange: PropTypes.func.isRequired,
  boletoHandleSubmit: PropTypes.func.isRequired,
  boletoInstructions: PropTypes.string.isRequired,
  boletoInstructionsOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  t: PropTypes.func.isRequired,
}

export default ProductInfo
