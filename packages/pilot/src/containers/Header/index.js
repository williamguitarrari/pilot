/* eslint-disable */
import React, { Fragment, isValidElement } from 'react'
import PropTypes from 'prop-types'
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom'

import {
  Avatar,
  Button,
  Header,
  HeaderBackButton,
  HeaderContent,
  HeaderMenu,
  HeaderTitle,
  Popover,
  PopoverContent,
  PopoverMenu,
  Spacing,
} from 'former-kit'

import IconTestAmbientOff from 'emblematic-icons/svg/TestAmbientOff24.svg'
import IconTestAmbientOn from 'emblematic-icons/svg/TestAmbientOn24.svg'
import IconArrowDownRight from 'emblematic-icons/svg/ArrowDownRight24.svg'
import IconRocket from './rocket.svg'

import environment, {
  liveUrl,
  testUrl,
} from '../../environment'

import style from './style.css'

const getEnvironmentUrl = () => (
  environment === 'test'
    ? liveUrl
    : testUrl
)

const renderTestEnviromentNav = () => (
  <div className={style.testEnvironmentLabel}>
    <p>Você está em ambiente de testes, operações realizadas neste ambiente não geram pagamentos reais.</p>
    <a href={liveUrl}>
      Mudar para live
      <IconArrowDownRight className={style['testEnvironmentLabel-icon']} />
    </a>
  </div>
)

const renderLiveEnvironmentButton = ({
  t,
}) => (
  <Popover
    content={(
      <PopoverContent>
        <small>
          {t(`header.environment.text_${environment}`)}&nbsp;
          <a href={getEnvironmentUrl()}>
            {t('header.environment.text_action')}
          </a>.
        </small>
      </PopoverContent>
    )}
    placement="bottomEnd"
  >
    <Button
      fill="clean"
      icon={
        environment === 'test'
          ? <IconTestAmbientOn />
          : <IconTestAmbientOff />
      }
    />
  </Popover>
)

const HeaderContainer = ({
  onBack,
  onLogout,
  onSettings,
  onWelcome,
  routes,
  showWelcomeButton,
  t,
  user,
}) => (
  <>
    { environment === 'test' && renderTestEnviromentNav() }
    <Header>
      <HashRouter>
        <Switch>
          {routes.map(({
            exact,
            icon: Icon,
            path,
            title,
          }) => (
            <Route
              exact={exact}
              key={path}
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
        {showWelcomeButton && (
          <>
            <Button
              icon={<IconRocket />}
              onClick={onWelcome}
            >
              <span className={style.welcome}>
                {t('header.welcome')}
              </span>
            </Button>

            <Spacing size="small" />
          </>
        )}

        {environment === 'live' && renderLiveEnvironmentButton({ t })}

        <Spacing size="small" />

        <HeaderMenu
          title={(
            <Fragment>
              <Avatar alt={user.name} />
              <span>{user.name}</span>
            </Fragment>
          )}
        >
          <PopoverContent>
            <strong>
              {user.name}
            </strong>
            <small>
              {t(`models.user.permission.${user.permission}`)}
            </small>
          </PopoverContent>
          <PopoverMenu
            items={[
              { action: onSettings, title: t('header.account.settings') },
              { action: onLogout, title: t('header.account.logout') },
            ]}
          />
        </HeaderMenu>
      </HeaderContent>
    </Header>
  </>
)

renderLiveEnvironmentButton.propTypes = {
  t: PropTypes.func.isRequired,
}

HeaderContainer.propTypes = {
  onBack: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onWelcome: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    component: isValidElement,
    exact: PropTypes.bool,
    path: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  showWelcomeButton: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

export default HeaderContainer
