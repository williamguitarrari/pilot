import React from 'react'
import {
  Grid,
  Row,
  Col,
} from 'former-kit'

import Section from '../../Section'
import DataDisplay from '../../../src/components/DataDisplay'

const DataDisplayExample = () => (
  <Section>
    <Grid>
      <Row>
        <Col palm={12} tablet={12} desk={12}>
          <DataDisplay
            align="center"
            color="#65a300"
            subtitle={(
              <span>
                Capturado em 10/03/2018 às 14:15h
              </span>
            )}
            title="Random number"
            value={1234}
            valueSize="huge"
          />
        </Col>
      </Row>

      <Row>
        <Col palm={12} tablet={12} desk={12}>
          <DataDisplay
            align="end"
            color="#df285f"
            title="Data"
            value="20/02/2000"
            valueSize="huge"
          />
        </Col>
      </Row>

      <Row>
        <Col palm={12} tablet={12} desk={12}>
          <DataDisplay
            align="start"
            color="#df285f"
            title="Data"
            value="20/02/2000"
            valueSize="huge"
          />
        </Col>
      </Row>
    </Grid>
  </Section>
)

export default DataDisplayExample
