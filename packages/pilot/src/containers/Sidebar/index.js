import React, { useState, isValidElement } from 'react'
import PropTypes from 'prop-types'
import {
  always,
  equals,
  ifElse,
} from 'ramda'

import {
  Button,
  Popover,
  PopoverContent,
  Sidebar,
  SidebarHeader,
  SidebarLink,
  SidebarLinks,
} from 'former-kit'

import IconMenuCollapsed from 'emblematic-icons/svg/MenuCollapsed24.svg'
import IconMenuNotCollapsed from 'emblematic-icons/svg/MenuNotCollapsed24.svg'

import IconWallet from 'emblematic-icons/svg/Wallet32.svg'

import style from './style.css'

import Sections from './Sections'
import SidebarSummary from '../../components/SidebarSummary'

const getMenuIcon = ifElse(
  equals(true),
  always(IconMenuCollapsed),
  always(IconMenuNotCollapsed)
)

const SidebarContainer = ({
  balance,
  companyName,
  companyType,
  links,
  logo: Logo,
  onLinkClick,
  onWithdraw,
  t,
  transfersPricing,
}) => {
  const [collapsed, setCollapsed] = useState(false)
  const [summaryCollapsed, setSummaryCollapsed] = useState(false)

  const handleToggleSidebar = () => setCollapsed(!collapsed)

  const handleToggleSummary = () => setSummaryCollapsed(!summaryCollapsed)

  const renderSections = () => (
    <Sections
      balance={balance}
      companyType={companyType}
      onWithdraw={onWithdraw}
      t={t}
      transfersPricing={transfersPricing}
    />
  )

  const MenuIcon = getMenuIcon(collapsed)

  const summarySubtitle = summaryCollapsed
    ? t('pages.sidebar.show_balance')
    : t('pages.sidebar.hide_balance')

  return (
    <Sidebar collapsed={collapsed}>
      <SidebarHeader>
        {!collapsed && <Logo width={140} />}

        <Button
          onClick={handleToggleSidebar}
          icon={(
            <MenuIcon
              width={24}
              height={24}
              className={style.sidebarIcon}
            />
          )}
          fill="clean"
          relevance="low"
        />
      </SidebarHeader>

      {!collapsed
        && (
          <SidebarSummary
            collapsed={summaryCollapsed}
            onClick={handleToggleSummary}
            subtitle={summarySubtitle}
            title={companyName}
          >
            {renderSections()}
          </SidebarSummary>
        )
      }

      {collapsed
        && (
          <Popover
            base="dark"
            content={(
              <PopoverContent>
                {renderSections()}
              </PopoverContent>
            )}
            placement="rightStart"
          >
            <SidebarLinks>
              <SidebarLink
                collapsed={collapsed}
                onClick={() => null}
                icon={<IconWallet width={16} height={16} />}
                title={t('pages.sidebar.balance')}
              />
            </SidebarLinks>
          </Popover>
        )
      }

      <SidebarLinks>
        {links.map(({
          active,
          exact,
          icon: Icon,
          path,
          title,
        }) => (
          <SidebarLink
            key={path}
            title={t(title)}
            active={active}
            icon={<Icon width={16} height={16} />}
            collapsed={collapsed}
            onClick={() => onLinkClick({ active, exact, path })}
          />
        ))}
      </SidebarLinks>
    </Sidebar>
  )
}

SidebarContainer.propTypes = {
  // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // It was commented on to remove the anticipation limits call on Balance page
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // anticipationLimit: PropTypes.number,
  balance: PropTypes.shape({
    available: PropTypes.number,
  }).isRequired,
  companyName: PropTypes.string,
  companyType: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    component: isValidElement,
    icon: PropTypes.func,
    path: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  logo: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func,
  t: PropTypes.func.isRequired,
  transfersPricing: PropTypes.shape({
    ted: PropTypes.number,
  }),
}

SidebarContainer.defaultProps = {
  // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // It was commented on to remove the anticipation limits call on Balance page
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // anticipationLimit: null,
  companyName: '',
  companyType: '',
  onWithdraw: null,
  transfersPricing: {},
}

export default SidebarContainer
