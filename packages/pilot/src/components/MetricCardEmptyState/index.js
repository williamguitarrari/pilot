import React from 'react'
import PropTypes from 'prop-types'
import { CardContent, Flexbox } from 'former-kit'
import styles from './style.css'

const EmptyState = ({
  icon,
  text,
}) => (
  <CardContent className={styles.emptyState}>
    <Flexbox
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <div>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </Flexbox>
  </CardContent>
)

EmptyState.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
}

export default EmptyState
