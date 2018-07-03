import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Spacing } from 'former-kit'
import IconArrowDown from 'emblematic-icons/svg/ChevronDown32.svg'
import IconArrowUp from 'emblematic-icons/svg/ChevronUp32.svg'

import style from './style.css'

const SidebarSummary = ({
  children,
  collapsed,
  onClick,
  subtitle,
  title,
}) => (
  <div
    className={classNames(style.summary, {
      [style.expanded]: !collapsed,
    })}
  >
    <button
      className={style.title}
      onClick={onClick}
      role="link"
    >
      {title}

      {subtitle &&
        <span className={style.subtitle}>
          {subtitle}
          <Spacing size="small" />
          {collapsed
            ? <IconArrowDown height={16} width={16} />
            : <IconArrowUp height={16} width={16} />
          }
        </span>
      }
    </button>

    {!collapsed
      && children
    }
  </div>
)

SidebarSummary.propTypes = {
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default SidebarSummary
