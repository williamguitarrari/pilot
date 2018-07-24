import React from 'react'
import PropTypes from 'prop-types'

import style from './style.css'

const MessageActions = ({ children }) => (
  <div className={style.actions}>
    {children}
  </div>
)

MessageActions.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MessageActions
