import React from 'react'
import PropTypes from 'prop-types'

import {
  Header,
  HeaderContent,
  HeaderMenu,
  HeaderTitle,
} from 'former-kit'


const HeaderContainer = ({
  onClickMenu,
  t,
}) => (
  <Header>
    <HeaderTitle>{t('header.title')}</HeaderTitle>
    <HeaderContent>
      <HeaderMenu onClick={onClickMenu}>
        <span>Logout</span>
      </HeaderMenu>
    </HeaderContent>
  </Header>
)

HeaderContainer.propTypes = {
  t: PropTypes.func.isRequired,
  onClickMenu: PropTypes.func.isRequired,
}

export default HeaderContainer
