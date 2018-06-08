import React from 'react'
import { FormInput } from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import CurrencyInput from '../../../src/components/CurrencyInput'

const CurrencyInputExample = () => (
  <Section>
    <FormInput
      label="Currency Input"
      renderer={props => (
        <CurrencyInput
          {...props}
        />
      )}
      onChange={action('handleChange')}
      value="100"
    />
  </Section>
)

export default CurrencyInputExample
