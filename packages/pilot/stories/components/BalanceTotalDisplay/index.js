import React from 'react'
import {
  Grid,
  Row,
  Card,
  Col,
} from 'former-kit'
import { action } from '@storybook/addon-actions'

import Section from '../../Section'
import BalanceTotalDisplay from '../../../src/components/BalanceTotalDisplay'

const amount = 150000

const BalanceTotalDisplayExample = () => (
  <Section>
    <Grid>
      <Row>
        <Col palm={12} tablet={6} desk={4} tv={4}>
          <Card>
            <BalanceTotalDisplay
              amount={amount}
              action={{
                onClick: action('clicked'),
                title: 'Sacar',
              }}
              detail={
                <span>Disponível para saque: <strong>R$5.000,00</strong></span>
              }
              title="Saldo Atual"
            />
          </Card>
        </Col>

        <Col palm={12} tablet={6} desk={4} tv={4}>
          <Card>
            <BalanceTotalDisplay
              amount={amount}
              action={{
                onClick: action('clicked'),
                title: 'Antecipar',
              }}
              detail={
                <span>Disponível para saque: <strong>R$5.000,00</strong></span>
              }
              title="A Receber"
            />
          </Card>
        </Col>
      </Row>
    </Grid>
  </Section>
)

export default BalanceTotalDisplayExample
