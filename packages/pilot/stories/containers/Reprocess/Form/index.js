import React from 'react'
import { action } from '@storybook/addon-actions'
import { Card } from 'former-kit'
import ReprocessForm from '../../../../src/containers/Reprocess/Form'

const ReprocessFormState = () => (
  <Card>
    <ReprocessForm
      onCancel={action('cancel')}
      onConfirm={action('submit')}
      amount={2000000}
      cardFirstDigits="123456"
      cardLastDigits="7890"
      holderName="Lorem Ipsum de Consectetuer e Amet"
      installments={48}
      t={translations => translations}
    />
  </Card>
)

export default ReprocessFormState
