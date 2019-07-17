import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.css'

const MetricListItem = ({
  icon,
  title,
  value,
}) => (
  <div className={styles.item}>
    <span className={styles.icon}>{icon}</span>
    {title}
    <span className={styles.value}>{value}</span>
  </div>
)

const listItemPropTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
}

MetricListItem.propTypes = listItemPropTypes

export default MetricListItem
