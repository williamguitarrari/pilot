import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'former-kit'
import withSpinner from '../withSpinner'

import styles from './style.css'

const enhance = withSpinner(styles.overlay)

const MetricCard = ({ children, emptyState, isEmpty }) => (
  <div className={styles.metricCard}>
    <Card>
      {isEmpty && emptyState}
      {!isEmpty && children}
    </Card>
  </div>
)

MetricCard.propTypes = {
  children: PropTypes.node.isRequired,
  emptyState: PropTypes.node,
  isEmpty: PropTypes.bool,
}

MetricCard.defaultProps = {
  emptyState: null,
  isEmpty: false,
}

export default enhance(MetricCard)
