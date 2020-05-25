import React from 'react'
import PropTypes from 'prop-types'

const ClickableDiv = ({
  children, className, onClick, onKeyPress,
}) => (
  <div
    className={className}
    onClick={onClick}
    onKeyPress={onKeyPress}
    role="button"
    tabIndex={0}
  >
    {children}
  </div>
)

ClickableDiv.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
}

ClickableDiv.defaultProps = {
  className: '',
  onClick: () => {},
  onKeyPress: () => {},
}

export default ClickableDiv
