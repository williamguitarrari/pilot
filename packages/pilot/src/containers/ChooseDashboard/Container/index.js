import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

import EllipseSvg from './ellipse.svg'
import CirclesSvg from './circles.svg'

const ChooseDashboardContainer = ({ children }) => (
  <div
    className={styles.chooseDashboardContainer}
  >
    <EllipseSvg className={styles.ellipse} />
    <CirclesSvg className={styles.circles} />
    {children}
  </div>
)

ChooseDashboardContainer.propTypes = {
  children: PropTypes.element.isRequired,
}

export default ChooseDashboardContainer
