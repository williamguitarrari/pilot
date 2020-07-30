import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { applySpec, compose, path } from 'ramda'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import ChooseDashboardContainer from '../../containers/ChooseDashboard'

import environment from '../../environment'

const mapStateToProps = applySpec({
  sessionId: path(['account', 'sessionId']),
})

const enhanced = compose(
  translate(),
  connect(mapStateToProps),
  withRouter
)

const setChoosenDashboard = (version) => {
  localStorage.setItem('dashboardChoice', version)
  localStorage.setItem('dashboardChoiceExpiresAt', moment().add(7, 'days').toISOString())
}

const ChooseDashboardPage = ({
  history,
  sessionId,
  t,
}) => {
  const onLegacyDashboard = () => {
    setChoosenDashboard('legacy')
    return window.open(`https://dashboard.pagar.me/#login?session_id=${sessionId}&redirect_to=dashboard.home&environment=${environment}`, '_self')
  }

  const onNewDashboard = () => {
    setChoosenDashboard('new-dash')
    return history.replace('/')
  }

  return (
    <ChooseDashboardContainer
      onLegacyDashboard={onLegacyDashboard}
      onNewDashboard={onNewDashboard}
      t={t}
    />
  )
}

ChooseDashboardPage.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  sessionId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(ChooseDashboardPage)
