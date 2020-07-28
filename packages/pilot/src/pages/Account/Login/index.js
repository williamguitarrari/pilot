import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'

import { compose } from 'ramda'
import { connect } from 'react-redux'

import LoginForm from '../../../containers/Account/LoginForm'

import { requestLogin } from '../actions/actions'

import buildParamErrors from './buildParamErrors'

import environment, { liveUrl, testUrl, recaptchaKey } from '../../../environment'

const oppositeEnvironmentUrl = environment === 'live'
  ? testUrl
  : liveUrl

const mapStateToProps = (state) => {
  const {
    account: {
      error,
      loading,
      token,
    },
  } = state

  return {
    error,
    loading,
    token,
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: (data) => {
    dispatch(requestLogin({ ...data, environment }))
  },
})

const enhanced = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  translate(),
  withRouter
)

const handleChangeEnvironment = () => {
  window.location.href = oppositeEnvironmentUrl
}

class LoginPage extends PureComponent {
  constructor () {
    super()

    this.handlePasswordRecovery = this.handlePasswordRecovery.bind(this)
  }

  handlePasswordRecovery () {
    const { history } = this.props
    history.push('/account/password/recovery')
  }

  render () {
    const {
      error,
      loading,
      onLogin,
      t,
    } = this.props
    return (
      <LoginForm
        environment={environment}
        recaptchaKey={recaptchaKey}
        errors={buildParamErrors(error)}
        loading={loading}
        onLogin={onLogin}
        onPasswordRecovery={this.handlePasswordRecovery}
        onChangeEnvironment={handleChangeEnvironment}
        t={t}
      />
    )
  }
}

LoginPage.propTypes = {
  error: PropTypes.instanceOf(Error),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loading: PropTypes.bool,
  onLogin: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

LoginPage.defaultProps = {
  error: null,
  loading: false,
}

export default enhanced(LoginPage)
