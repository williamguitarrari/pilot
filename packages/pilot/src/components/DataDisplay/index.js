import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import style from './style.css'

const DataDisplay = ({
  align,
  children,
  color,
  subtitle,
  title,
  value,
}) => (
  <div className={
      classNames(style.content, {
        [style[align]]: align,
      })
    }
  >
    <div className={style.title}>
      {
        typeof title === 'string'
          ? <h2 style={{ color }}>{title}</h2>
          : title
      }
    </div>

    {children || (
      <div className={style.value}>
        <h3>{value}</h3>
      </div>
    )}

    <div className={style.subtitle}>
      {subtitle}
    </div>
  </div>
)

DataDisplay.propTypes = {
  align: PropTypes.oneOf([
    'center',
    'end',
    'start',
  ]),
  children: PropTypes.node,
  color: PropTypes.string,
  subtitle: PropTypes.node,
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

DataDisplay.defaultProps = {
  align: 'center',
  children: null,
  color: '#757575',
  subtitle: null,
  value: '',
}

export default DataDisplay
