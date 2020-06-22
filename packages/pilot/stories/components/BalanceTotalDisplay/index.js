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

const EnabledWithdrawExample = () => (
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
                <span>Disponível para saque: <strong>R$1.500,00</strong></span>
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
                <span>Antecipe e receba antes! Veja sua disponibilidade:</span>
            }
              title="A Receber"
            />
          </Card>
        </Col>
      </Row>
    </Grid>
  </Section>
)

const BlockedWithdrawExample = () => (
  <Section>
    <Grid>
      <Row>
        <Col palm={12} tablet={6} desk={4} tv={4}>
          <Card>
            <BalanceTotalDisplay
              amount={amount}
              detail={(
                <span>Não é possível realizar saques no momento
                  <br /> pois seu saldo encontra-se em análise,<br />
                  <a href="https://google.com" target="_blank" rel="noreferrer noopener">entenda o que isso significa</a>.
                </span>
              )}
              disabled
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
                <span>Antecipe e receba antes! Veja sua disponibilidade:</span>
            }
              title="A Receber"
            />
          </Card>
        </Col>
      </Row>
    </Grid>
  </Section>
)

export default {
  BlockedWithdraw: BlockedWithdrawExample,
  EnabledWithdraw: EnabledWithdrawExample,
}
