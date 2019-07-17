import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardTitle,
  CardContent,
} from 'former-kit'

import MetricListItem from './MetricListItem'

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
      {items.map(({
        icon,
        title: itemTitle,
        value,
      }, index) => (
        <MetricListItem
          key={`${index}-${value}`} // eslint-disable-line react/no-array-index-key
          icon={icon}
          title={itemTitle}
          value={value}
        />
      ))}
    </CardContent>
  </Card>
)

MetricList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape(MetricListItem.propTypes)
  ).isRequired,
  title: PropTypes.string.isRequired,
}

export default MetricList
