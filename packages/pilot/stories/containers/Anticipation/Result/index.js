import React from 'react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import {
  last,
  pipe,
  split,
} from 'ramda'
import AnticipationResult from '../../../../src/containers/Anticipation/Result'
import Section from '../../../Section'

const bankAccount = {
  agencia: '0932',
  agencia_dv: '5',
  bank_code: '341',
  charge_transfer_fees: true,
  conta: '58054',
  conta_dv: '1',
  date_created: '2017-01-06T18:52:22.215Z',
  document_number: '26268738888',
  document_type: 'cpf',
  id: 17365090,
  legal_name: 'API BANK ACCOUNT',
  object: 'bank_account',
  type: 'conta_corrente',
}

const totalCost = -50000
const requested = 300000
const amount = requested + totalCost

export const AnticipationResultWithAutomaticTransfer = () => (
  <Section>
    <AnticipationResult
      amount={amount}
      automaticTransfer
      bankAccount={bankAccount}
      date={moment()}
      onTryAgain={action('TryAgain')}
      onViewStatement={action('ViewStatement')}
      requested={requested}
      status="success"
      statusMessage="Antecipação solicitada com sucesso!"
      t={pipe(split('.'), last)}
      timeframe="start"
      totalCost={totalCost}
    />
  </Section>
)

export const AnticipationResultWithoutAutomaticTransfer = () => (
  <Section>
    <AnticipationResult
      amount={amount}
      automaticTransfer={false}
      date={moment()}
      onTryAgain={action('TryAgain')}
      onViewStatement={action('ViewStatement')}
      requested={requested}
      status="success"
      statusMessage="Antecipação solicitada com sucesso!"
      t={pipe(split('.'), last)}
      timeframe="start"
      totalCost={totalCost}
    />
  </Section>
)

export const AnticipationResultError = () => (
  <Section>
    <AnticipationResult
      amount={amount}
      automaticTransfer={false}
      date={moment()}
      onTryAgain={action('TryAgain')}
      onViewStatement={action('ViewStatement')}
      requested={requested}
      status="error"
      statusMessage="Ocorreu um erro"
      t={pipe(split('.'), last)}
      timeframe="start"
      totalCost={totalCost}
    />
  </Section>
)
