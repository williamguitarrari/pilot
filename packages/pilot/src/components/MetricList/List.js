import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem'

const List = ({
  items,
}) => (
  <Fragment>
    {items.map(({
      icon,
      title: itemTitle,
      value,
    }, index) => (
      <ListItem
        // eslint-disable-next-line react/no-array-index-key
        key={`${index}-${value}`}
        icon={icon}
        title={itemTitle}
        value={value}
      />
    ))}
  </Fragment>
)

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape(ListItem.propTypes)
  ).isRequired,
}

export default List
