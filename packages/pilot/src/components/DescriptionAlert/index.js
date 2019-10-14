import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Flexbox,
} from 'former-kit'

import styles from './style.css'

const DescriptionAlert = ({
  content,
  icon,
  title,
  type,
}) => (
  <Flexbox
    className={styles.descriptionAlert}
    direction="row"
  >
    <div className={classNames(styles.icon, styles[type])}>
      {icon}
    </div>
    <Flexbox
      className={styles.container}
      direction="column"
    >
      <span className={styles.title}>{title}</span>
      <div className={styles.content}>
        {content}
      </div>
    </Flexbox>
  </Flexbox>
)

DescriptionAlert.propTypes = {
  content: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'error', 'info', 'success', 'warning',
  ]).isRequired,
}

export default DescriptionAlert
