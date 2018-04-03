import React from 'react'
import PropTypes from 'prop-types'

import { values } from 'ramda'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import routes from './routes'
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
  t,
  onLogout,
  history: { goBack },
}) => (
  <Header
    onClickMenu={onLogout}
    routes={values(routes)}
    onBack={goBack}
    t={t}
  />
)

HeaderContainer.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default withRouter(enhance(HeaderContainer))
