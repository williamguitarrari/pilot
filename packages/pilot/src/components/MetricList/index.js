import React from 'react'
import PropTypes from 'prop-types'
import {
  CardTitle,
  CardContent,
} from 'former-kit'
import {
  anyPass,
  isEmpty,
  isNil,
} from 'ramda'
import EmptyState from '../MetricCardEmptyState'
import MetricCard from '../MetricCard'
import List from './List'
import styles from './style.css'

const isNilOrEmpty = anyPass([isNil, isEmpty])

const showEmptyState = (emptyIcon, emptyText, items) => (
  emptyIcon && emptyText && isNilOrEmpty(items)
)

const MetricList = ({
  emptyIcon,
  emptyText,
  items,
  loading,
  title,
}) => (
  <MetricCard
    emptyState={<EmptyState icon={emptyIcon} text={emptyText} />}
    isEmpty={showEmptyState(emptyIcon, emptyText, items)}
    loading={loading}
  >
    <CardTitle title={title} />
    <CardContent className={styles.list}>
      <List items={items} />
    </CardContent>
  </MetricCard>
)

MetricList.propTypes = {
  emptyIcon: PropTypes.element,
  emptyText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape(List.propTypes.items)
  ).isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

MetricList.defaultProps = {
  emptyIcon: null,
  emptyText: null,
  loading: false,
}

export default MetricList
