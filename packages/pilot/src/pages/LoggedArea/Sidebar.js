import React from 'react'
import PropTypes from 'prop-types'
import {
  head,
  pipe,
  split,
  values,
} from 'ramda'

import { withRouter } from 'react-router-dom'

import SidebarContainer from '../../containers/Sidebar'

import routes from './routes'

import Logo from '../logo.svg'

const removeRouteParams = pipe(
  split(':'),
  head
)

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
        active: pathname.includes(removeRouteParams(route.path)),
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
