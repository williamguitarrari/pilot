import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { requestLogout } from '../Account/actions'

import Header from '../../containers/Header'

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(requestLogout())
  },
})

const enhance = connect(
  null,
  mapDispatchToProps
)

const HeaderContainer = ({
  onLogout,
  t,
}) => (
  <Header
    onClickMenu={onLogout}
    t={t}
  />
)

HeaderContainer.propTypes = {
  t: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default enhance(HeaderContainer)
