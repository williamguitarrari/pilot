import React from 'react'
import PropTypes from 'prop-types'

import { values } from 'ramda'

import { withRouter } from 'react-router-dom'

import SidebarContainer from '../../containers/Sidebar'

import routes from './routes'

import Logo from '../logo.svg'

const Sidebar = ({
  location: { pathname },
  history,
  t,
}) => (
  <SidebarContainer
    logo={Logo}
    links={values(routes)
      .filter(({ hidden }) => !hidden)
      .map(route => ({
        ...route,
        active: pathname.includes(route.path),
      }))
    }
    onLinkClick={history.push}
    t={t}
  />
)

Sidebar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default withRouter(Sidebar)
