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
import IconArrowDownRight from 'emblematic-icons/svg/ArrowDownRight24.svg'
import IconRocket from './rocket.svg'

import environment, {
  liveUrl,
  testUrl,
} from '../../environment'

import style from './style.css'
import isPaymentLink from '../../validation/isPaymentLink'

const getEnvironmentUrl = () => (
  environment === 'test'
    ? liveUrl
    : testUrl
)

const renderTestEnviromentNav = t => (
  <div className={style.testEnvironmentLabel}>
    <p>{t('header.environment.text_test_1')}&nbsp;
      <b>{t('header.environment.text_test_2')}</b>
    </p>
    <a href={liveUrl}>
      {t('header.environment.text_action_test')}
      <IconArrowDownRight height={10} />
    </a>
  </div>
)

const renderEnvironmentButton = ({
  t,
}) => (
  <Popover
    content={(
      <PopoverContent>
        <small>
          {t('header.environment.text_live')}&nbsp;
          <a href={getEnvironmentUrl()}>
            {t('header.environment.text_action_live')}
          </a>.
        </small>
      </PopoverContent>
    )}
    placement="bottomEnd"
  >
    <Button
      fill="clean"
      icon={<IconTestAmbientOff />}
    />
  </Popover>
)

const HeaderContainer = ({
  companyType,
  onBack,
  onBackToOldVersion,
  onLogout,
  onSettings,
  onWelcome,
  routes,
  showWelcomeButton,
  t,
  user,
}) => {
  const items = isPaymentLink(companyType)
    ? [
      { action: onSettings, title: t('header.account.settings') },
      { action: onLogout, title: t('header.account.logout') },
    ]
    : [
      { action: onSettings, title: t('header.account.settings') },
      { action: onBackToOldVersion, title: t('header.back_to_old_version') },
      { action: onLogout, title: t('header.account.logout') },
    ]

  return (
    <>
      { environment === 'test' && renderTestEnviromentNav(t) }
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

          {
            companyType
              && environment === 'live'
              && !isPaymentLink(companyType)
              && renderEnvironmentButton({ t })
          }

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
              items={items}
            />
          </HeaderMenu>
        </HeaderContent>
      </Header>
    </>
  )
}

renderEnvironmentButton.propTypes = {
  t: PropTypes.func.isRequired,
}

HeaderContainer.propTypes = {
  companyType: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  onBackToOldVersion: PropTypes.func.isRequired,
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

HeaderContainer.defaultProps = {
  companyType: '',
}

export default HeaderContainer
