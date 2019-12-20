/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  head,
} from 'ramda'
import IconChevronUp from 'emblematic-icons/svg/ChevronUp24.svg'
import IconChevronDown from 'emblematic-icons/svg/ChevronDown24.svg'

import style from './style.css'

const getActiveColor = (active, choosedColor, type) => {
  const baseColors = {
    background: '#fff',
    number: '#4d4f62',
  }

  return active
    ? choosedColor
    : baseColors[type]
}

const getTextColor = (active, color) => {
  const defaultColor = '#757575'
  const choosedColor = color === '#f2cb03'
    ? '#000000'
    : '#fff'

  return active
    ? choosedColor
    : defaultColor
}

const renderIndicatorArrow = (collapsed, active, color) => (
  <span style={{ color: getActiveColor(active, color, 'number') }}>
    {
      collapsed
        ? <IconChevronDown width={12} height={12} />
        : <IconChevronUp width={12} height={12} />
    }
  </span>
)

class Event extends React.Component {
  constructor (props) {
    super(props)

    const { collapsed } = this.props

    this.state = {
      collapsed,
    }

    this.handleCollapse = this.handleCollapse.bind(this)
  }

  handleCollapse () {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed,
    }))
  }

  render () {
    const {
      active,
      children,
      color,
      isMoreThanOneOperation,
      number,
      title,
    } = this.props

    const { collapsed } = this.state

    return (
      <div
        className={classNames(style.event, {
          [style.active]: active,
          [style.hasEvents]: isMoreThanOneOperation,
        })}
        onClick={this.handleCollapse}
        role="button"
        style={{
          backgroundColor: getActiveColor(active, color, 'background'),
          color: getTextColor(active, color),
        }}
        tabIndex="0"
      >
        <header className={style.header}>
          <span
            className={style.number}
            style={{ color: getActiveColor(active, color, 'number') }}
          >
            {number}
          </span>
          <h3 className={style.title}>{title}</h3>
        </header>

        <div className={style.info}>
          {
            collapsed && isMoreThanOneOperation
              ? head(children)
              : children
          }
        </div>

        <div className={classNames(style.indicator, { [style.line]: !active })}>
          {
            isMoreThanOneOperation
              && renderIndicatorArrow(collapsed, active, color)
          }
        </div>
      </div>
    )
  }
}

Event.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
  color: PropTypes.string.isRequired,
  isMoreThanOneOperation: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

Event.defaultProps = {
  active: false,
  collapsed: false,
}

export default Event
