import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardTitle,
  CardContent,
} from 'former-kit'

import List from './List'

import styles from './style.css'

const MetricList = ({
  items,
  title,
}) => (
  <Card>
    <CardTitle title={title} />
    <CardContent
      className={styles.list}
    >
      <List
        items={items}
      />
    </CardContent>
  </Card>
)

MetricList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape(List.propTypes)
  ).isRequired,
  title: PropTypes.string.isRequired,
}

export default MetricList
