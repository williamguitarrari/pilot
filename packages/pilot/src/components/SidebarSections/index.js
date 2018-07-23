import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'

import style from './style.css'

const SidebarSections = ({
  sections,
}) => (
  <div className={style.sections}>
    <ul>
      {sections.map(({
        action,
        actionTitle,
        title,
        value,
      }) => (
        <li
          key={title}
          className={style.item}
        >
          <span className={style.title}>{title}</span>
          <div className={style.value}>{value}</div>
          {actionTitle &&
            <Button
              className={style.action}
              onClick={action}
              size="tiny"
            >
              {actionTitle}
            </Button>
          }
        </li>
      ))}
    </ul>
  </div>
)

SidebarSections.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func,
    actionTitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    value: PropTypes.element.isRequired,
  })).isRequired,
}

export default SidebarSections
