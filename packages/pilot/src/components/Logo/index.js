import React from 'react'
import PropTypes from 'prop-types'
import BaseLight from './baseLight.svg'
import BaseDark from './baseDark.svg'

const DARK_BASE = 'dark'
const LIGHT_BASE = 'light'

const Logo = ({
  base,
  ...props
}) => {
  if (base === LIGHT_BASE) {
    return <BaseLight {...props} />
  }

  return <BaseDark {...props} />
}

Logo.propTypes = {
  base: PropTypes.oneOf([DARK_BASE, LIGHT_BASE]),
}

Logo.defaultProps = {
  base: DARK_BASE,
}

export default Logo
