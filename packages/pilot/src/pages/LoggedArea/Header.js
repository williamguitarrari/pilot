import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { requestLogout } from '../Account/actions'

import Header from '../../containers/Header'

const mapStateToProps = ({ account: { user } }) => ({
  user,
  avatar: 'https://randomuser.me/api/portraits/thumb/men/12.jpg',
})

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(requestLogout())
  },
})

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
)

const HeaderContainer = ({
  avatar,
  user,
  onLogout,
}) => (
  <Header
    avatar={avatar}
    username={user.name}
    onClickMenu={onLogout}
  />
)

HeaderContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  avatar: PropTypes.string,
}

HeaderContainer.defaultProps = {
  avatar: null,
}

export default enhance(HeaderContainer)
