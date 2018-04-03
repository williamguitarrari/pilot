import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'

import { connect } from 'react-redux'
import { compose } from 'ramda'

import { requestLogin } from './Account/actions'

import Account from './Account'
import LoggedArea from './LoggedArea'

const mapStateToProps = ({ account: { client, user, sessionId } }) =>
  ({ client, user, sessionId })

const mapDispatchToProps = {
  requestLogin,
}
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)

class Root extends Component {
  componentDidMount () {
    const {
      client,
      sessionId,
    } = this.props

    if (!client && sessionId) {
      this.props.requestLogin({ session_id: sessionId })
    }
  }

  render () {
    const {
      client,
      user,
      location: { pathname: path },
      sessionId,
    } = this.props

    if (!client && sessionId) {
      return null
    }

    return (
      <Fragment>
        {!client && !path.startsWith('/account')
          ? <Redirect to="/account/login" />
          : <Route path="/account" component={Account} />
        }
        {client && user && path.startsWith('/account/login') &&
          <Redirect to="/" />
        }
        {client && user &&
          <LoggedArea />
        }
      </Fragment>
    )
  }
}

Root.propTypes = {
  client: PropTypes.object, // eslint-disable-line
  user: PropTypes.object, // eslint-disable-line
  sessionId: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  requestLogin: PropTypes.func.isRequired,
}

Root.defaultProps = {
  client: null,
  user: null,
  sessionId: null,
  location: {},
}

export default enhance(Root)
