import React, { Fragment } from 'react'
import {
  Grid,
  Row,
  Col,
} from 'former-kit'

import IconInfo from 'emblematic-icons/svg/Info24.svg'

import Section from '../../Section'
import TotalDisplay from '../../../src/components/TotalDisplay'

const TotalDisplayExample = () => (
  <Fragment>
    <Section>
      <Grid>
        <Row>
          <Col palm={12} tablet={12} desk={12}>
            <h2>Total Display without colors</h2>
            <TotalDisplay
              align="center"
              amount={1000000000}
              amountSize="large"
              color="#65a300"
              subtitle={(
                <span>
                  Capturado em 10/03/2018 às 14:15h
                </span>
              )}
              title="Valor Capturado"
              titleColor="#757575"
              titleSize="small"
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={12}>
            <TotalDisplay
              align="start"
              amount={-500000}
              amountSize="large"
              color="#df285f"
              subtitle={(
                <span>
                  MDR: R$ 6,00 | Valor estornado: R$ 15,00 <br />
                  Outras saídas: R$ 0,75 <IconInfo width={12} height={12} />
                </span>
              )}
              title="Total de Saídas"
              titleColor="#757575"
              titleSize="small"
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={12}>
            <TotalDisplay
              align="end"
              amount={9995000000}
              amountSize="large"
              color="#4079bb"
              subtitle={(
                <span>
                  Data a receber: 20/03/2018
                </span>
              )}
              title="Valor Líquido"
              titleColor="#757575"
              titleSize="small"
            />
          </Col>
        </Row>
      </Grid>
      <Grid>
        <Row>
          <Col palm={12} tablet={12} desk={12}>
            <h2>Total Display with colors</h2>
            <TotalDisplay
              align="center"
              amount={1000000000}
              amountSize="large"
              color="#65a300"
              subtitle={(
                <span>
                  Capturado em 10/03/2018 às 14:15h
                </span>
              )}
              title="Valor Capturado"
              titleColor="#65a300"
              titleSize="medium"
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={12}>
            <TotalDisplay
              align="start"
              amount={-500000}
              amountSize="large"
              color="#df285f"
              subtitle={(
                <span>
                  MDR: R$ 6,00 | Valor estornado: R$ 15,00 <br />
                  Outras saídas: R$ 0,75 <IconInfo width={12} height={12} />
                </span>
              )}
              title="Total de Saídas"
              titleColor="#df285f"
              titleSize="medium"
            />
          </Col>
        </Row>

        <Row>
          <Col palm={12} tablet={12} desk={12}>
            <TotalDisplay
              align="end"
              amount={9995000000}
              amountSize="large"
              color="#4079bb"
              subtitle={(
                <span>
                  Data a receber: 20/03/2018
                </span>
              )}
              title="Valor Líquido"
              titleColor="#4079bb"
              titleSize="medium"
            />
          </Col>
        </Row>
      </Grid>
    </Section>

  </Fragment>
)

export default TotalDisplayExample
