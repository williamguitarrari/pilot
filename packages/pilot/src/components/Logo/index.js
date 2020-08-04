import React from 'react'
import PropTypes from 'prop-types'
import LogoLive from './logo-live.svg'
import LogoTest from './logo-test.svg'

const Logo = ({
  test,
  ...props
}) => {
  if (test) {
    return <LogoTest {...props} />
  }

  return <LogoLive {...props} />
}

Logo.propTypes = {
  test: PropTypes.bool,
}

Logo.defaultProps = {
  test: false,
}

export default Logo
