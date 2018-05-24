import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.css'

const RiskLevel = ({
  level,
}) => (
  <div className={style.riskLevelBar}>
    <div
      className={classNames(
        style.riskLevel,
        style[level]
      )}
    />
  </div>
)

RiskLevel.propTypes = {
  level: PropTypes.oneOf([
    'high',
    'low',
    'moderated',
    'very_high',
    'very_low',
  ]).isRequired,
}

export default RiskLevel
