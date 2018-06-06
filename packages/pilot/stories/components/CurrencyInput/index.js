import React from 'react'
import { FormInput } from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import CurrencyInput from '../../../src/components/CurrencyInput'

const handleChange = (event, value) => action(value)

const CurrencyInputExample = () => (
  <Section>
    <FormInput
      label="Currency Input"
      renderer={({ renderer, ...props }) => (
        <CurrencyInput
          {...props}
        />
      )}
      onChange={handleChange}
      value="100"
    />
  </Section>
)

export default CurrencyInputExample
