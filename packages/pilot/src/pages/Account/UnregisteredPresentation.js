import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'

import { compose } from 'ramda'

import UnregisteredPresentation from '../../containers/Account/UnregisteredPresentation'

const enhanced = compose(
  translate(),
  withRouter
)

class UnregisteredPresentationPage extends PureComponent {
  // eslint-disable-next-line class-methods-use-this
  handleLogin (e) {
    e.preventDefault()
    window.location = 'https://dashboard.pagar.me/#/signup'
  }

  render () {
    return (
      <UnregisteredPresentation
        onBackToLogin={this.handleLogin}
        t={this.props.t}
      />
    )
  }
}

UnregisteredPresentationPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default enhanced(UnregisteredPresentationPage)
