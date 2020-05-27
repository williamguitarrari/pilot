import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, pathOr } from 'ramda'

import { requestLogout } from '../../Account/actions/actions'
import AddRecipient from '../../../containers/AddRecipient'
import env from '../../../environment'

const getUserPermission = pathOr('admin', ['permission'])

const getAnticipationParams = pathOr(true, ['anticipation_config', 'config_anticipation_params'])

const getMinimumAnticipationDelay = pathOr(15, ['anticipation_config', 'minimum_delay'])

const getMaximumAnticipationDays = pathOr(31, ['anticipation_config', 'max_anticipation_days'])

const getCanCreateRecipient = pathOr(true, ['marketplace', env, 'can_create_recipient'])

const mapStateToProps = (state) => {
  const { account } = state
  const { client, company, user } = account || {}

  const userPermission = getUserPermission(user)
  const canCreateRecipient = getCanCreateRecipient(company)
  const canConfigureAnticipation = getAnticipationParams(company)
  const minimumAnticipationDelay = getMinimumAnticipationDelay(company)
  const maximumAnticipationDays = getMaximumAnticipationDays(company)

  const options = {
    canConfigureAnticipation,
    canCreateRecipient,
    maximumAnticipationDays,
    minimumAnticipationDelay,
    userPermission,
  }

  return {
    client,
    options,
  }
}

const mapDispatchToProp = ({
  redirectToLoginPage: requestLogout,
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProp),
  translate(),
  withRouter
)

class AddRecipientPage extends Component {
  constructor (props) {
    super(props)

    this.fetchAccounts = this.fetchAccounts.bind(this)
    this.onExit = this.onExit.bind(this)
    this.onLoginAgain = this.onLoginAgain.bind(this)
    this.onViewDetails = this.onViewDetails.bind(this)
    this.submitRecipient = this.submitRecipient.bind(this)
  }

  onExit () {
    const { history } = this.props
    history.replace('/recipients')
  }

  onLoginAgain () {
    const { redirectToLoginPage } = this.props
    redirectToLoginPage()
  }

  onViewDetails (recipientId) {
    const { history } = this.props
    history.replace(`/recipients/detail/${recipientId}`)
  }

  submitRecipient (recipient) {
    const { client, options } = this.props
    return client.recipient.add(recipient, options)
  }

  fetchAccounts (document) {
    const { client } = this.props
    return client.recipient.bankAccount(document)
  }

  render () {
    const {
      options,
      t,
    } = this.props
    return (
      <AddRecipient
        fetchAccounts={this.fetchAccounts}
        onExit={this.onExit}
        onLoginAgain={this.onLoginAgain}
        onViewDetails={this.onViewDetails}
        options={options}
        submitRecipient={this.submitRecipient}
        t={t}
      />
    )
  }
}

AddRecipientPage.propTypes = {
  client: PropTypes.shape({
    recipient: PropTypes.shape({
      add: PropTypes.func.isRequired,
      bankAccount: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  options: PropTypes.shape({
    canConfigureAnticipation: PropTypes.bool,
    canCreateRecipient: PropTypes.bool,
    maximumAnticipationDays: PropTypes.number,
    minimumAnticipationDelay: PropTypes.number,
    userPermission: PropTypes.string,
  }).isRequired,
  redirectToLoginPage: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(AddRecipientPage)
