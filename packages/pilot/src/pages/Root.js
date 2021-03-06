import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import moment from 'moment-timezone'

import {
  Route,
  withRouter,
} from 'react-router-dom'

import { connect } from 'react-redux'
import {
  compose,
  pipe,
  startsWith,
  tail,
} from 'ramda'

import { requestLogin as requestLoginAction } from './Account/actions/actions'
import { inactiveCompanyLogin } from '../vendor/googleTagManager'

import Account from './Account'
import ChooseDashboard from './ChooseDashboard'
import LoggedArea from './LoggedArea'
import Onboarding from './Onboarding/Onboarding'
import Loader from '../components/Loader'

import environment from '../environment'
import { page as appcuesPage } from '../vendor/appcues'
import { shouldSkipOnboarding } from './EmptyState/reducer'

const mapStateToProps = ({
  account: {
    client,
    company,
    sessionId,
    user,
  },
  welcome,
}) => ({
  client,
  company,
  loadingOnboardingAnswers: welcome.loading,
  sessionId,
  skipOnboarding: shouldSkipOnboarding({ company, welcome }),
  user,
})

const mapDispatchToProps = {
  requestLogin: requestLoginAction,
}
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)
const parseQueryString = pipe(tail, qs.parse)

const getSessionId = (props, queryString) => (
  props.sessionId || queryString.session_id
)

const shouldSkipChooseDashboard = (company = {}) => {
  const typesThatSkipChooseDashboard = ['payment_link_app', 'self_register']
  return typesThatSkipChooseDashboard.includes(company.type)
}

const hasValidDashboardChoice = () => {
  if (!localStorage.getItem('dashboardChoice')) {
    return false
  }

  const choiceExpiresAt = localStorage.getItem('dashboardChoiceExpiresAt')
  const isExpired = moment(choiceExpiresAt).isBefore(moment())

  return !isExpired
}

class Root extends Component {
  componentDidMount () {
    const {
      client,
      history: { listen },
      location: { search: queryString },
      requestLogin,
    } = this.props

    const historyUnlisten = listen(() => {
      appcuesPage()
    })

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ historyUnlisten })

    const parsedQueryString = parseQueryString(queryString)
    const sessionId = getSessionId(this.props, parsedQueryString)

    if (parsedQueryString.session_id) {
      localStorage.setItem('dashboardChoice', 'new-dash')
    }

    if (!client && !sessionId) {
      inactiveCompanyLogin()
    }

    if (!client && sessionId) {
      requestLogin({ environment, session_id: sessionId })
    }
  }

  componentWillUnmount () {
    const { historyUnlisten } = this.state
    historyUnlisten()
  }

  render () {
    const {
      client,
      company,
      history,
      loadingOnboardingAnswers,
      location: {
        pathname: path,
        search: queryString,
      },
      sessionId,
      skipOnboarding,
      user,
    } = this.props

    const parsedQueryString = parseQueryString(queryString)
    const redirect = parsedQueryString.redirect || '/'

    if (!client && sessionId) {
      return null
    }

    if (!client && !startsWith('/account', path)) {
      history.replace('/account/login')
      return null
    }

    if (!client) {
      return (
        <Route path="/account" component={Account} />
      )
    }

    if (user && startsWith('/account/login', path)) {
      history.replace(redirect)
      return null
    }

    if (!user || !company || loadingOnboardingAnswers) {
      return (
        <Loader
          opaqueBackground
          position="absolute"
          visible
        />
      )
    }

    if (user && startsWith('/choose-dashboard', path)) {
      return <Route path="/choose-dashboard" component={ChooseDashboard} />
    }

    if (
      user
      && !shouldSkipChooseDashboard(company)
      && !hasValidDashboardChoice()
    ) {
      history.replace('/choose-dashboard')
      return null
    }

    if (
      user
      && !shouldSkipChooseDashboard(company)
      && localStorage.getItem('dashboardChoice') === 'legacy'
    ) {
      return window.open(`https://dashboard.pagar.me/#login?session_id=${sessionId}&redirect_to=dashboard.home&environment=${environment}`, '_self')
    }

    if (!skipOnboarding) {
      return <Onboarding />
    }

    return <LoggedArea />
  }
}

Root.propTypes = {
  client: PropTypes.object, // eslint-disable-line
  company: PropTypes.object, // eslint-disable-line
  history: PropTypes.shape({
    listen: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  loadingOnboardingAnswers: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  requestLogin: PropTypes.func.isRequired,
  sessionId: PropTypes.string,
  skipOnboarding: PropTypes.bool.isRequired,
  user: PropTypes.object, // eslint-disable-line
}

Root.defaultProps = {
  client: null,
  company: null,
  sessionId: null,
  user: null,
}

export default enhance(Root)
