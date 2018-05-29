import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../../Section'
import BoletoConfirmation from '../../../../src/containers/Refund/BoletoConfirmation'
import style from './style.css'

const t = translate => translate

const BoletoConfirmationExample = () => (
  <Section className={style.section}>
    <BoletoConfirmation
      amount={125000000}
      bankAccount={{
        agencia_dv: '5',
        agencia: '1234',
        bank_code: '000',
        conta_dv: '0',
        conta: '17000',
        document_number: '53431319050',
        legal_name: 'João da silva',
        type: 'conta_corrente',
      }}
      onBack={action('onBack')}
      onConfirm={action('confirm')}
      refundAmount="125000000"
      t={t}
    />
  </Section>
)

export default BoletoConfirmationExample
