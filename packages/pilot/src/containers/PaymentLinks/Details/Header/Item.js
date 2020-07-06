import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const DetailsItem = ({ children, title }) => (
  <div>
    <p className={styles.title}>{title}</p>
    {children}
  </div>
)

DetailsItem.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
}

export default DetailsItem
