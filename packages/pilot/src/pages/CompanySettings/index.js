import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  compose,
  head,
  map,
  pathOr,
  pipe,
} from 'ramda'
import { translate } from 'react-i18next'

import CompanySettings from '../../containers/Settings/Company'
import environment from '../../environment'

const mapStateToProps = ({
  account: { client, user },
}) => ({ client, user })

const enhanced = compose(
  withRouter,
  connect(mapStateToProps),
  translate()
)

const formatErrors = pipe(
  pathOr([], ['response', 'errors']),
  map(error => error.message),
  head
)

class CompanySettingsPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      companyInfo: {
        address: {},
        apiKeys: null,
        apiVersion: null,
        general: {},
        managingPartner: {},
        pricing: [],
        team: [],
      },
      createUserStatus: {
        error: null,
        success: false,
        loading: false,
      },
      deleteUserStatus: {
        error: null,
        success: false,
      },
    }
    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.resetCreateUserState = this.resetCreateUserState.bind(this)
    this.requestData = this.requestData.bind(this)
  }

  componentWillMount () {
    this.requestData()
  }

  requestData () {
    this.props.client.company.info()
      .then((companyInfo) => {
        this.setState({ companyInfo })
      })
  }

  handleCreateUser (user) {
    const handleSuccess = () => this.setState({
      createUserStatus: {
        error: null,
        success: true,
        loading: false,
      },
    })

    const handleFailure = (response) => {
      this.setState({
        createUserStatus: {
          error: formatErrors(response),
          success: false,
          loading: false,
        },
      })
    }

    this.setState({
      createUserStatus: {
        error: null,
        success: false,
        loading: true,
      },
    }, () => this.props.client.invites
      .create(user)
      .then(handleSuccess)
      .catch(handleFailure)
    )
  }

  resetCreateUserState () {
    this.setState({
      createUserStatus: {
        error: null,
        success: false,
        loading: false,
      },
    })
  }


  handleDeleteUser (id) {
    this.props.client.user.destroy({ id })
      .then(() => {
        this.requestData()
        this.setState({
          deleteUserStatus: {
            error: null,
            success: true,
          },
        })
      })
      .catch((response) => {
        this.setState({
          deleteUserStatus: {
            error: formatErrors(response),
            success: false,
          },
        })
      })
  }

  render () {
    const {
      t,
    } = this.props

    const {
      companyInfo: {
        address,
        apiKeys,
        apiVersion,
        general,
        managingPartner,
        pricing,
        team,
      },
    } = this.state

    return (
      <CompanySettings
        address={address}
        apiKeys={apiKeys}
        apiVersion={apiVersion}
        createUserStatus={this.state.createUserStatus}
        deleteUserStatus={this.state.deleteUserStatus}
        environment={environment}
        general={general}
        handleCreateUser={this.handleCreateUser}
        handleDeleteUser={this.handleDeleteUser}
        managingPartner={managingPartner}
        pricing={pricing}
        resetCreateUserState={this.resetCreateUserState}
        t={t}
        team={team}
      />
    )
  }
}

CompanySettingsPage.propTypes = {
  client: PropTypes.shape({
    company: PropTypes.shape({
      info: PropTypes.func.isRequired,
    }),
    invites: PropTypes.shape({
      create: PropTypes.func.isRequired,
    }),
    user: PropTypes.shape({
      destroy: PropTypes.func.isRequired,
    }),
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(CompanySettingsPage)
