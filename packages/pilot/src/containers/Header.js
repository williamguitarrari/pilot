import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Switch,
  Route,
  HashRouter,
} from 'react-router-dom'

import {
  Avatar,
  Header,
  HeaderContent,
  HeaderMenu,
  HeaderTitle,
  HeaderBackButton,
  PopoverMenu,
} from 'former-kit'

const HeaderContainer = ({
  onSettings,
  onLogout,
  onBack,
  routes,
  t,
  user,
}) => (
  <Header>
    <HashRouter>
      <Switch>
        {routes.map(({
          icon: Icon,
          title,
          exact,
          path,
        }) => (
          <Route
            key={path}
            exact={exact}
            path={path}
            render={() => (
              <Fragment>
                {!Icon && <HeaderBackButton onClick={onBack} />}
                {Icon && <Icon width={16} height={16} />}
                <HeaderTitle>{t(title)}</HeaderTitle>
              </Fragment>
            )}
          />
        ))}
      </Switch>
    </HashRouter>

    <HeaderContent>
      <HeaderMenu
        title={
          <Fragment>
            <Avatar />
            <span>{user.name}</span>
          </Fragment>
        }
      >
        <div>
          <strong>
            {user.name}
          </strong>
          <small>
            {t(`models.user.permission.${user.permission}`)}
          </small>
        </div>
        <PopoverMenu
          items={[
            { title: t('header.account.settings'), action: onSettings },
            { title: t('header.account.logout'), action: onLogout },
          ]}
        />
      </HeaderMenu>
    </HeaderContent>
  </Header>
)

HeaderContainer.propTypes = {
  t: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.func,
  })).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onSettings: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default HeaderContainer
