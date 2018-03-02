import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Header from '../../containers/Header'

const enhance = connect(
  ({ account: { user } }) => ({
    user,
    avatar: 'https://randomuser.me/api/portraits/thumb/men/12.jpg',
  })
)

const HeaderContainer = ({ avatar, user }) => (
  <Header
    avatar={avatar}
    username={user.name}
  />
)

HeaderContainer.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  avatar: PropTypes.string,
}

HeaderContainer.defaultProps = {
  avatar: null,
}

export default enhance(HeaderContainer)
