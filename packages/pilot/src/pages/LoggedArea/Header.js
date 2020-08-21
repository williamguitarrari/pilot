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

import { requestLogout } from '../Account/actions/actions'
import isCompanyPaymentLink from '../../validation/isPaymentLink'
import isNilOrEmpty from '../../validation/isNilOrEmpty'
import isRecentlyCreatedCompany from '../../validation/recentCreatedCompany'
import environment from '../../environment'

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
  routes,
  sessionId,
  t,
  user,
}) => {
  const showWelcomeButton = !isNilOrEmpty(company)
    && isRecentlyCreatedCompany({ company })
    && isNotWelcomePage(pathname)
    && !isCompanyPaymentLink(company)

  return (
    <HeaderContainer
      company={company}
      onBack={goBack}
      onLogout={onLogout}
      onSettings={() => push(routes.accountSettings.path)}
      onWelcome={() => push(routes.emptyState.path)}
      onBackToOldVersion={
        () => {
          localStorage.setItem('dashboardChoice', 'legacy')
          return window.open(`https://dashboard.pagar.me/#login?session_id=${sessionId}&redirect_to=dashboard.home&environment=${environment}`)
        }
      }
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
  routes: PropTypes.shape({
    accountSettings: PropTypes.shape({
      path: PropTypes.string,
    }),
    emptyState: PropTypes.shape({
      path: PropTypes.string,
    }),
  }).isRequired,
  sessionId: PropTypes.string,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    date_created: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

Header.defaultProps = {
  company: {},
  sessionId: '',
}

export default enhance(Header)
