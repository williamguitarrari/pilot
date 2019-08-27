import React from 'react'
import PropTypes from 'prop-types'
import {
  gte,
  pipe,
  reduce,
} from 'ramda'
import {
  Card,
  CardContent,
  Flexbox,
} from 'former-kit'
import NoDataIcon from './icons/no-data.svg'
import withSpinner from '../../components/withSpinner'
import RadialChart from '../../components/MetricChart/charts/RadialChart'
import EmptyState from '../../components/MetricCardEmptyState'
import styles from './style.css'

const enhance = withSpinner(styles.overlay)

const isEmptyData = pipe(
  reduce((acc, { value }) => acc + (+value), 0),
  gte(0)
)

const ConversionCard = ({
  data,
  emptyText,
  title,
}) => {
  const isEmpty = isEmptyData(data)

  return (
    <Card className={styles.conversionChart}>
      <CardContent>
        <Flexbox
          alignItems="center"
          justifyContent="space-between"
        >
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.radialContainer}>
            {!isEmpty && (
              <RadialChart
                data={data}
                styles={{
                  height: 120,
                  innerRadius: '80%',
                  outerRadius: '100%',
                }}
              />
            )}
            {isEmpty && (
              <EmptyState
                icon={<NoDataIcon />}
                text={emptyText}
              />
            )}
          </div>
        </Flexbox>
      </CardContent>
    </Card>
  )
}

ConversionCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  emptyText: PropTypes.string,
  title: PropTypes.string.isRequired,
}

ConversionCard.defaultProps = {
  emptyText: '',
}

export default enhance(ConversionCard)
