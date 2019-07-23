import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem'

import styles from './style.css'

const List = ({
  items,
}) => (
  <Fragment>
    <div className={styles.list}>
      {items.map(({
        icon,
        title: itemTitle,
        value,
      }, index) => (
        <ListItem
          key={`${index}-${value}`} // eslint-disable-line react/no-array-index-key
          icon={icon}
          title={itemTitle}
          value={value}
        />
      ))}
    </div>
  </Fragment>
)

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape(ListItem.propTypes)
  ).isRequired,
}

export default List
