import React from 'react'
import { identity } from 'ramda'
import { action } from '@storybook/addon-actions'
import ReprocessResult from '../../../../src/containers/Reprocess/Result'

const Reprocess = () => (
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
    status="success"
    statusMessage="Transação foi reprocessada com sucesso."
    t={identity}
  />
)

export default Reprocess
