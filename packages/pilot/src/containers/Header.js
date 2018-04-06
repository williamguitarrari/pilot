import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Switch,
  Route,
} from 'react-router-dom'

import {
  Header,
  HeaderContent,
  HeaderLink,
  HeaderTitle,
  HeaderBackButton,
} from 'former-kit'

const HeaderContainer = ({
  onClickMenu,
  routes,
  onBack,
  t,
}) => (
  <Header>
    <Switch>
      {
        routes.map(({
          title,
          exact,
          path,
          component,
        }) => (
          <Route
            key={path}
            exact={exact}
            path={path}
            render={() => (
              <Fragment>
                {!component && <HeaderBackButton onClick={onBack} />}
                <HeaderTitle>{t(title)}</HeaderTitle>
              </Fragment>
              )
            }
          />
        ))
      }
    </Switch>

    <HeaderContent>
      <HeaderLink onClick={onClickMenu}>
        <span>Logout</span>
      </HeaderLink>
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
  onClickMenu: PropTypes.func.isRequired,
}

export default HeaderContainer
