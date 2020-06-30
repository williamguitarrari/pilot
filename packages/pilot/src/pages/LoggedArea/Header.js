import React from 'react'
import PropTypes from 'prop-types'

import {
  complement,
  compose,
  equals,
  values,
} from 'ramda'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import routes from './routes'
import { requestLogout } from '../Account/actions/actions'
import isRecentlyCreatedUser from '../../validation/recentCreatedUser'

import HeaderContainer from '../../containers/Header'

const isNotWelcomePage = complement(equals('/welcome'))

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(requestLogout())
  },
})

const mapStateToProps = ({ account: { company, user } }) => ({
  company,
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
  company,
  history: { goBack, push },
  location: {
    pathname,
  },
  onLogout,
  t,
  user,
}) => {
  const showWelcomeButton = isRecentlyCreatedUser({ company, user })
    && isNotWelcomePage(pathname)

  return (
    <HeaderContainer
      companyType={company.type}
      onBack={goBack}
      onLogout={onLogout}
      onSettings={() => push(routes.accountSettings.path)}
      onWelcome={() => push(routes.emptyState.path)}
      routes={values(routes)}
      showWelcomeButton={showWelcomeButton}
      t={t}
      user={user}
    />
  )
}

Header.propTypes = {
  company: PropTypes.shape({
    alreadyTransacted: PropTypes.bool,
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    date_created: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

Header.defaultProps = {
  company: {},
}

export default enhance(Header)
