import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const Label = ({ fontSize, value }) => (
  <text
    className={styles.legend}
    fontSize={fontSize}
    textAnchor="start"
    transform={`rotate(-90, ${fontSize + 1}, 125)`}
    x={fontSize + 1}
    y="125"
  >
    <tspan>{value}</tspan>
  </text>
)

Label.propTypes = {
  fontSize: PropTypes.number,
  value: PropTypes.string.isRequired,
}

Label.defaultProps = {
  fontSize: 12,
}

export default Label
