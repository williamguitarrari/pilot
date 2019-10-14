import React from 'react'
import PropTypes from 'prop-types'
import { identity } from 'ramda'
import { action } from '@storybook/addon-actions'
import ReprocessResult from '../../../../src/containers/Reprocess/Result'

const Reprocess = ({ status }) => (
  <ReprocessResult
    amount={234567}
    cardFirstDigits="123456"
    cardLastDigits="4444"
    holderName="José da Silva"
    id="123456"
    installments={12}
    onCopyIdClick={action('copy id')}
    onRestart={action('reprocess restart')}
    onViewTransactionClick={action('view transaction')}
    status={status}
    statusMessage="Houve um erro no reprocessamento da transação"
    t={identity}
  />
)

Reprocess.propTypes = {
  status: PropTypes.string,
}

Reprocess.defaultProps = {
  status: 'success',
}

export default Reprocess
