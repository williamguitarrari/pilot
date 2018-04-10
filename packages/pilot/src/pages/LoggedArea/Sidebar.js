import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Sidebar from '../../containers/Sidebar'
import routes from './routes'
import Logo from '../logo.svg'

const SidebarState = ({
  location: { pathname },
  history,
  t,
}) => (
  <Sidebar
    logo={Logo}
    links={Object.values(routes).filter(r => r.component).map(route => ({
        ...route,
        title: t(route.title),
    }))}
    onLinkClick={history.push}
    pathName={pathname}
  />
)

SidebarState.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default withRouter(SidebarState)
