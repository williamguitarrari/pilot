import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  Flexbox,
} from 'former-kit'

import withSpinner from '../../components/withSpinner'
import RadialChart from '../../components/MetricChart/charts/RadialChart'
import styles from './style.css'

const enhance = withSpinner(styles.overlay)

const ConversionCard = ({
  data,
  title,
}) => (
  <Card className={styles.conversionChart}>
    <CardContent>
      <Flexbox
        alignItems="center"
        direction="row"
        justifyContent="center"
      >
        <span className={styles.title}>
          {title}
        </span>
        <div className={styles.radialContainer}>
          <RadialChart
            data={data}
            styles={{
              height: 120,
              innerRadius: '80%',
              outerRadius: '100%',
            }}
          />
        </div>
      </Flexbox>
    </CardContent>
  </Card>
)

ConversionCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
}

export default enhance(ConversionCard)
