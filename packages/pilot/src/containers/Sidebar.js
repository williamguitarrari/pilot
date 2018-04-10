import React from 'react'
import PropTypes from 'prop-types'
import {
  defaultTo,
  filter,
  head,
  pipe,
  split,
} from 'ramda'
import {
  Sidebar,
  SidebarHeader,
  SidebarLink,
  SidebarLinks,
} from 'former-kit'

import Menu32 from 'emblematic-icons/svg/Menu32.svg'

const defaultToEmptyStr = defaultTo('')
const getBasePath = pipe(
  defaultToEmptyStr,
  split('/'),
  filter(Boolean),
  head,
  defaultToEmptyStr
)

class SidebarContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
    }

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
  }

  handleToggleSidebar () {
    const { collapsed } = this.state
    this.setState({ collapsed: !collapsed })
  }

  render () {
    const { collapsed } = this.state
    const {
      logo: Logo,
      links,
      pathName,
      onLinkClick,
    } = this.props
    return (
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed && <Logo width="140" />}
          <button onClick={this.handleToggleSidebar}>
            <Menu32 width={16} height={16} />
          </button>
        </SidebarHeader>
        <SidebarLinks>
          {links.map(({ title, path, icon: Icon }) => (
            <SidebarLink
              active={getBasePath(path) === getBasePath(pathName)}
              collapsed={collapsed}
              icon={<Icon width={16} height={16} />}
              key={path}
              onClick={() => onLinkClick(path)}
              title={title}
            />
          )
        )}
        </SidebarLinks>
      </Sidebar>
    )
  }
}

SidebarContainer.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.func,
    icon: PropTypes.func,
    path: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  logo: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  pathName: PropTypes.string.isRequired,
}

export default SidebarContainer
