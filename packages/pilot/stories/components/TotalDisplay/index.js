import React from 'react'
import {
  Grid,
  Row,
  Col,
} from 'former-kit'

import IconInfo from 'emblematic-icons/svg/Info24.svg'

import Section from '../../Section'
import TotalDisplay from '../../../src/components/TotalDisplay'

const TotalDisplayExample = () => (
  <Section>
    <Grid>
      <Row stretch>
        <Col palm={12} tablet={6} desk={3}>
          <TotalDisplay
            title="Valor Capturado"
            amount={1000000000}
            color="#37cc9a"
            unity="R$"
            subtitle={
              <span>
                Capturado em 10/03/2018 às 14:15h
              </span>
            }
          />
        </Col>

        <Col palm={12} tablet={6} desk={3}>
          <TotalDisplay
            title="Total de Saídas"
            amount={-500000}
            color="#ff796f"
            unity="R$"
            subtitle={
              <span>
                MDR: R$ 6,00 | Valor estornado: R$ 15,00 <br />
                Outras saídas: R$ 0,75 <IconInfo width={12} height={12} />
              </span>
            }
          />
        </Col>

        <Col palm={12} tablet={6} desk={3}>
          <TotalDisplay
            title="Valor Líquido"
            amount={9995000000}
            color="#4ca9d7"
            unity="R$"
            subtitle={
              <span>
                Data a receber: 20/03/2018
              </span>
            }
          />
        </Col>
      </Row>
    </Grid>
  </Section>
)

export default TotalDisplayExample
