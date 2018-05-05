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
      <Row stretch>
        <Col palm={12} tablet={6} desk={3}>
          <DataDisplay
            color="#37cc9a"
            subtitle={
              <span>
                Capturado em 10/03/2018 às 14:15h
              </span>
            }
            title="Random number"
            value={1234}
          />
        </Col>

        <Col palm={12} tablet={6} desk={3}>
          <DataDisplay
            color="#ff796f"
            title="Data"
            value="20/02/2000"
          />
        </Col>
      </Row>
    </Grid>
  </Section>
)

export default DataDisplayExample
