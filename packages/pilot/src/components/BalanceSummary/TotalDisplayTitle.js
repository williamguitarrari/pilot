import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'former-kit'
import HelpInfo from 'emblematic-icons/svg/Help32.svg'
import style from './style.css'

const TotalDisplayTitle = ({
  children,
  description,
  type,
}) => (
  <div className={style.totalDisplayTitle}>
    {children}
    <Tooltip
      content={<div className={style.tooltip}>{description}</div>}
      placement="topCenter"
    >
      <HelpInfo
        className={style.helpIcon}
        color={style[type]}
        height={16}
        width={16}
      />
    </Tooltip>
  </div>
)

TotalDisplayTitle.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default TotalDisplayTitle
