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

import environment from '../environment'

const mapStateToProps = ({
  account: {
    client,
    company,
    sessionId,
    user,
  },
}) =>
  ({
    client,
    company,
    sessionId,
    user,
  })

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
      this.props.requestLogin({ session_id: sessionId, environment })
    }
  }

  render () {
    const {
      client,
      company,
      location: { pathname: path },
      sessionId,
      user,
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
        {client && company && user &&
          <LoggedArea />
        }
      </Fragment>
    )
  }
}

Root.propTypes = {
  client: PropTypes.object, // eslint-disable-line
  company: PropTypes.object, // eslint-disable-line
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  requestLogin: PropTypes.func.isRequired,
  sessionId: PropTypes.string,
  user: PropTypes.object, // eslint-disable-line
}

Root.defaultProps = {
  client: null,
  company: null,
  location: {},
  sessionId: null,
  user: null,
}

export default enhance(Root)
