import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.css'

const CustomLabel = ({ labelFormatter, value }) => (
  <text
    className={styles.label}
    dominantBaseline="middle"
    textAnchor="middle"
    x="50%"
    y="50%"
  >
    {labelFormatter(value)}
  </text>
)

CustomLabel.propTypes = {
  labelFormatter: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

export default CustomLabel
