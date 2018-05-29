import React from 'react'
import PropTypes from 'prop-types'

import { either, is } from 'ramda'

import style from './style.css'

const isStringOrNumber = either(
  is(String),
  is(Number)
)

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
