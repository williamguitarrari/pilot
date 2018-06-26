import React from 'react'
import { Grid, Row, Col } from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import BalanceTotalDisplay from '../../../src/components/BalanceTotalDisplay'

const BalanceTotalDisplayExample = () => (
  <Section>
    <Grid>
      <Row>
        <Col palm={12} tablet={6} desk={4} tv={4}>
          <BalanceTotalDisplay
            title="Saldo Atual"
            amount="R$ 15.000,00"
            detail={<span>Liberado para saque: <strong>R$5.000,00</strong></span>}
            action={{
              title: 'Sacar',
              onClick: action('clicked'),
            }}
          />
        </Col>

        <Col palm={12} tablet={6} desk={4} tv={4}>
          <BalanceTotalDisplay
            title="A Receber"
            amount="R$ 7.000,00"
            detail={<span>Liberado para saque: <strong>R$5.000,00</strong></span>}
            action={{
              title: 'Antecipar',
              onClick: action('clicked'),
            }}
          />
        </Col>
      </Row>
    </Grid>
  </Section>
)

export default BalanceTotalDisplayExample
