import React from 'react'
import BoletoConfigurationForm from '../../../../src/containers/Settings/Boleto/Form'

const Form = () => (
  <BoletoConfigurationForm
    instructionsOptions={[
      {
        name: 'settings.boleto.instructions.accept',
        value: 'accept',
      },
      {
        name: 'settings.boleto.instructions.refuse',
        value: 'refuse',
      },
    ]}
    defaultInstruction="accept"
    payableOffset={7}
    t={translate => translate}
  />
)

export default Form
