import React from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  CardTitle,
} from 'former-kit'
import EmptyState from '../MetricCardEmptyState'
import MetricCard from '../MetricCard'
import styles from './style.css'

const showEmptyState = (emptyIcon, emptyText, value) => (
  emptyIcon && emptyText && !value
)

const MetricIndicator = ({
  emptyIcon,
  emptyText,
  icon,
  loading,
  title,
  value,
}) => (
  <MetricCard
    emptyState={<EmptyState icon={emptyIcon} text={emptyText} />}
    isEmpty={showEmptyState(emptyIcon, emptyText, value)}
    loading={loading}
  >
    <CardTitle title={title} />
    <CardContent>
      <div className={styles.info}>
        <h1 className={styles.value}>{value}</h1>
        <span className={styles.icon}>{icon}</span>
      </div>
    </CardContent>
  </MetricCard>
)

MetricIndicator.propTypes = {
  emptyIcon: PropTypes.element,
  emptyText: PropTypes.string,
  icon: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
}

MetricIndicator.defaultProps = {
  emptyIcon: null,
  emptyText: null,
  loading: false,
}

export default MetricIndicator
