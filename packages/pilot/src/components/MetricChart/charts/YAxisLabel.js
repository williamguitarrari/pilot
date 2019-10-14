import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const Label = ({ fontSize, textAnchor, value }) => (
  <text
    className={styles.legend}
    fontSize={fontSize}
    textAnchor={textAnchor}
    transform={`rotate(-90, ${fontSize + 1}, 125)`}
    x={fontSize + 1}
    y="125"
  >
    <tspan>{value}</tspan>
  </text>
)

Label.propTypes = {
  fontSize: PropTypes.number,
  textAnchor: PropTypes.oneOf([
    'start', 'middle', 'end',
  ]),
  value: PropTypes.string,
}

Label.defaultProps = {
  fontSize: 12,
  textAnchor: 'start',
  value: '',
}

export default Label
