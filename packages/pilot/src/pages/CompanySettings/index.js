import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  compose,
  defaultTo,
  find,
  head,
  map,
  pathOr,
  pipe,
  prop,
  propEq,
  propOr,
  uncurryN,
} from 'ramda'
import { translate } from 'react-i18next'

import CompanySettings from '../../containers/Settings/Company'
import environment from '../../environment'

const mapStateToProps = ({
  account: { client, user, company },
}) => ({ client, user, company })

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

const getPropFromBoleto = (propName, company) =>
  pathOr(null, ['boletos', propName], company)

const getPropExpiration = pipe(
  propOr('', 'expiration'),
  defaultTo(''),
  String
)

const getPropFromInstructions =
  (search, propName) => uncurryN(2, instructions => pipe(
    find(propEq(search, instructions)),
    prop(propName)
  ))

const getNameFromInstructions = getPropFromInstructions('value', 'name')
const getValueFromInstructions = getPropFromInstructions('name', 'value')

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
      boleto: {
        actionsDisabled: true,
        error: null,
        expiration: null,
        instructions: null,
        loading: false,
      },
    }

    this.boletoOptions = [
      {
        name: props.t('pages.settings.company.boleto.options.accept'),
        value: 'accept_payment',
      },
      {
        name: props.t('pages.settings.company.boleto.options.refuse'),
        value: 'deny_payment',
      },
    ]

    this.getInitialStateFromProps = this.getInitialStateFromProps.bind(this)
    this.handleBoletoCancel = this.handleBoletoCancel.bind(this)
    this.handleBoletoChange = this.handleBoletoChange.bind(this)
    this.handleBoletoSubmit = this.handleBoletoSubmit.bind(this)
    this.handleCreateUser = this.handleCreateUser.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.requestData = this.requestData.bind(this)
    this.resetCreateUserState = this.resetCreateUserState.bind(this)
  }

  componentDidMount () {
    this.requestData()
    this.getInitialStateFromProps()
  }

  getInitialStateFromProps () {
    const { client } = this.props
    const { boleto } = this.state

    client.company.current()
      .then((response) => {
        this.setState({
          boleto: {
            ...boleto,
            actionsDisabled: true,
            expiration: getPropFromBoleto(
              'days_to_add_in_expiration_date', response
            ),
            instructions: getValueFromInstructions(
              response.boletos.instrucoes,
              this.boletoOptions
            ),
          },
        })
      })
  }

  handleBoletoCancel () {
    const { company } = this.props
    const { boleto } = this.state

    this.setState({
      boleto: {
        ...boleto,
        actionsDisabled: true,
        expiration: getPropFromBoleto(
          'days_to_add_in_expiration_date', company
        ),
        instructions: getValueFromInstructions(
          company.boletos.instrucoes,
          this.boletoOptions
        ),
      },
    })
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

  handleBoletoChange (data) {
    this.setState({
      boleto: {
        actionsDisabled: false,
        error: null,
        expiration: data.daysToAddInExpirationDate,
        instructions: data.instructions,
        loading: false,
      },
    })
  }

  handleBoletoSubmit (data, error) {
    const { boleto } = this.state
    const { client: { company } } = this.props

    const handleSuccess = ({ boletos }) => {
      this.setState({
        boleto: {
          ...boleto,
          actionsDisabled: true,
          loading: false,
          expiration: boletos.days_to_add_in_expiration_date,
          instructions: getValueFromInstructions(
            boletos.instrucoes, this.boletoOptions
          ),
        },
      })
    }

    const handleError = response => this.setState({
      boleto: {
        ...boleto,
        error: formatErrors(response),
        actionsDisabled: true,
        loading: false,
      },
    })

    if (!error) {
      this.setState({
        boleto: {
          ...boleto,
          loading: true,
          actionsDisabled: true,
        },
      }, () => {
        company.update({
          boletos: {
            days_to_add_in_expiration_date: data.daysToAddInExpirationDate,
            instrucoes: getNameFromInstructions(
              data.instructions,
              this.boletoOptions
            ),
          },
          instrucoes_type: data.instructions,
        })
          .then(handleSuccess)
          .catch(handleError)
      })
    }
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
      boleto,
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
        boletoActionsDisabled={boleto.actionsDisabled || boleto.loading}
        boletoDaysToAddInExpirationDate={getPropExpiration(boleto)}
        boletoDisabled={boleto.loading}
        boletoInstructions={boleto.instructions}
        boletoInstructionsOptions={this.boletoOptions}
        createUserStatus={this.state.createUserStatus}
        deleteUserStatus={this.state.deleteUserStatus}
        environment={environment}
        general={general}
        handleCreateUser={this.handleCreateUser}
        handleDeleteUser={this.handleDeleteUser}
        managingPartner={managingPartner}
        onBoletoSettingsCancel={this.handleBoletoCancel}
        onBoletoSettingsChange={this.handleBoletoChange}
        onBoletoSettingsSubmit={this.handleBoletoSubmit}
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
      update: PropTypes.func.isRequired,
    }),
    invites: PropTypes.shape({
      create: PropTypes.func.isRequired,
    }),
    user: PropTypes.shape({
      destroy: PropTypes.func.isRequired,
    }),
  }).isRequired,
  company: PropTypes.shape({
    boletos: PropTypes.shape({
      days_to_add_in_expiration_date: PropTypes.number.isRequired,
      instrucoes: PropTypes.string.isRequired,
    }).isRequired,
  }),
  t: PropTypes.func.isRequired,
}

CompanySettingsPage.defaultProps = {
  company: null,
}

export default enhanced(CompanySettingsPage)
