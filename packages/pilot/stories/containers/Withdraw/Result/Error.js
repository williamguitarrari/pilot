import React from 'react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import {
  last,
  pipe,
  split,
} from 'ramda'
import WithdrawResult from '../../../../src/containers/Withdraw/Result'
import Section from '../../../Section'

const recipient = {
  bank_account: {
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
  },
  date_created: '2017-01-06T18:59:35.936Z',
  id: 're_cixm61j7e00doin6de8ocgttb',
  last_transfer: null,
  object: 'recipient',
  transfer_enabled: true,
}

const transferCost = -324

const WithdrawResultState = () => (
  <Section>
    <WithdrawResult
      amount={34234 + transferCost}
      bankAccount={recipient.bank_account}
      date={moment()}
      onTryAgain={action('Try again')}
      onViewStatement={action('See statement')}
      requested={34234}
      status="error"
      statusMessage="Erro ao sacar"
      t={pipe(split('.'), last)}
      transferCost={transferCost}
    />
  </Section>
)

export default WithdrawResultState
