import React from 'react'
import PropTypes from 'prop-types'

import {
  CardContent,
  Tag,
} from 'former-kit'

import {
  anyPass,
  isEmpty,
  isNil,
  join,
} from 'ramda'

import style from './style.css'

const isNilOrEmpty = anyPass([isNil, isEmpty])

const Tags = ({
  t,
  tags,
}) => (
  <CardContent className={style.selectedOptionsTags}>
    <span className={style.selectedOptionsTitle}>
      {t('components.filter.filtering_by')}
    </span>
    {tags.map(({ items, key, name }) => (
      !isNilOrEmpty(items)
        && (
          <Tag key={key}>
            <strong>{name}</strong>: {join(', ', items)}
          </Tag>
        )
    ))}
  </CardContent>
)

Tags.propTypes = {
  t: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string),
    key: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
}

export default Tags
