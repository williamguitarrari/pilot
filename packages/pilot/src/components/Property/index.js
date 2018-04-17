import React from 'react'
import PropTypes from 'prop-types'

import style from './style.css'

const Property = ({ title, value }) => (
  <div className={style.property} >
    <h4 className={style.title}>{title}</h4>
    <span className={style.value}>{value}</span>
  </div>
)

Property.defaultProps = {
  value: null,
}

Property.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}
export default Property
