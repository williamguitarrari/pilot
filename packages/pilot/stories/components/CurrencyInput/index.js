import React from 'react'
import {
  Col,
  Grid,
  FormInput,
  Row,
} from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import CurrencyInput from '../../../src/components/CurrencyInput'

const CurrencyInputExample = () => (
  <Section>
    <Grid>
      <Row>
        <Col palm={12} tablet={12} desk={12} tv={12}>
          <h4> Without max prop </h4>
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
        </Col>
      </Row>
      <Row>
        <Col palm={12} tablet={12} desk={12} tv={12}>
          <h4> With max prop 999 </h4>
          <FormInput
            label="Currency Input"
            renderer={props => (
              <CurrencyInput
                {...props}
                max={999}
              />
            )}
            onChange={action('handleChange')}
            value="100"
          />
        </Col>
      </Row>
    </Grid>
  </Section>
)

export default CurrencyInputExample
