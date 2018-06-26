import React from 'react'
import PropTypes from 'prop-types'

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

const Property = ({ title, value }) => (
  <div className={style.property} >
    <h4 className={style.title}>{title}</h4>
    {isStringOrNumber(value)
      ? <span className={style.value}>{value}</span>
      : value
    }
  </div>
)

Property.defaultProps = {
  value: null,
}

Property.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.node,
}
export default Property
