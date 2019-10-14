import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  anyPass,
  is,
  isNil,
} from 'ramda'

import style from './style.css'

const isStringOrNumber = anyPass([
  is(String),
  is(Number),
  isNil,
])

const Property = ({ className, title, value }) => (
  <div className={classNames(style.property, className)}>
    <h4 className={style.title}>{title}</h4>
    {isStringOrNumber(value)
      ? <span className={style.value}>{value}</span>
      : value
    }
  </div>
)

Property.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.node,
}

Property.defaultProps = {
  className: '',
  value: null,
}

export default Property
