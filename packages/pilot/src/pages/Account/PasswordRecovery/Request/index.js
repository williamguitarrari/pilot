import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import { compose } from 'ramda'
import pagarme from 'pagarme'
import { PasswordRecoveryForm } from '../../../../containers/Account/PasswordRecovery/Request'
import buildResetParamErrors from './buildResetParamErrors'

const enhanced = compose(
  translate(),
  withRouter
)

class PasswordRecoveryPage extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      errors: null,
      loading: false,
    }

    this.handleBackToLogin = this.handleBackToLogin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleBackToLogin () {
    const { history } = this.props
    history.replace('/account/login')
  }

  handleSubmit (data, formErrors) {
    if (!formErrors) {
      const { history } = this.props

      this.setState({
        errors: null,
        loading: true,
      })

      pagarme.user.resetPassword({}, { email: data.email }).then(() => {
        this.setState({
          loading: false,
        })

        history.replace('/account/password/recovery/confirmation')
      }).catch((apiErrors) => {
        const parsedErrors = buildResetParamErrors(apiErrors)

        this.setState({
          errors: {
            email: parsedErrors.email,
          },
          loading: false,
        })
      })
    }
  }

  render () {
    const {
      base,
      t,
    } = this.props
    const {
      errors,
      loading,
    } = this.state

    return (
      <PasswordRecoveryForm
        base={base}
        errors={errors}
        loading={loading}
        onBackToLogin={this.handleBackToLogin}
        onSubmit={this.handleSubmit}
        t={t}
      />
    )
  }
}

PasswordRecoveryPage.propTypes = {
  base: PropTypes.oneOf(['dark', 'light']).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(PasswordRecoveryPage)
