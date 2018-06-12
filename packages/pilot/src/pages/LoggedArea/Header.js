import React from 'react'
import PropTypes from 'prop-types'

import {
  compose,
  values,
} from 'ramda'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import routes from './routes'
import { requestLogout } from '../Account/actions'

import HeaderContainer from '../../containers/Header'

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(requestLogout())
  },
})

const mapStateToProps = ({ account: { user } }) => ({
  user,
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

const Header = ({
  history: { goBack },
  onLogout,
  t,
  user,
}) => (
  <HeaderContainer
    onBack={goBack}
    onLogout={onLogout}
    onSettings={() => undefined}
    routes={values(routes)}
    t={t}
    user={user}
  />
)

Header.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default enhance(Header)
