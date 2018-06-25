import React from 'react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import {
  last,
  pipe,
  split,
} from 'ramda'
import AnticipationConfirmation from '../../../../src/containers/Anticipation/Confirmation'
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

export const AnticipationConfirmationWithAutomaticTransfer = () => (
  <Section>
    <AnticipationConfirmation
      amount={amount}
      automaticTransfer
      bankAccount={bankAccount}
      date={moment()}
      disabled={false}
      onCancel={action('cancel')}
      onConfirm={action('Confirm')}
      onReturn={action('Return')}
      requested={requested}
      t={pipe(split('.'), last)}
      totalCost={totalCost}
    />
  </Section>
)

export const AnticipationConfirmationWithoutAutomaticTransfer = () => (
  <Section>
    <AnticipationConfirmation
      amount={amount}
      automaticTransfer={false}
      date={moment()}
      disabled={false}
      onCancel={action('cancel')}
      onConfirm={action('Confirm')}
      onReturn={action('Return')}
      requested={requested}
      t={pipe(split('.'), last)}
      totalCost={totalCost}
    />
  </Section>
)

export const AnticipationConfirmationWithError = () => (
  <Section>
    <AnticipationConfirmation
      amount={amount}
      automaticTransfer={false}
      date={moment()}
      disabled={false}
      onCancel={action('cancel')}
      onConfirm={action('Confirm')}
      onReturn={action('Return')}
      error="invalid password"
      requested={requested}
      t={pipe(split('.'), last)}
      totalCost={totalCost}
    />
  </Section>
)

export const AnticipationConfirmationDisabled = () => (
  <Section>
    <AnticipationConfirmation
      amount={amount}
      automaticTransfer={false}
      date={moment()}
      disabled
      onCancel={action('cancel')}
      onConfirm={action('Confirm')}
      onReturn={action('Return')}
      requested={requested}
      t={pipe(split('.'), last)}
      totalCost={totalCost}
    />
  </Section>
)
