import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'

import { connect } from 'react-redux'
import { compose, pipe, tail } from 'ramda'

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
const parseQueryString = pipe(tail, qs.parse)

const getSessionId = (props, queryString) =>
  props.sessionId || queryString.session_id

class Root extends Component {
  componentDidMount () {
    const {
      client,
      location: { search: queryString },
    } = this.props

    const parsedQueryString = parseQueryString(queryString)
    const sessionId = getSessionId(this.props, parsedQueryString)

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
    search: PropTypes.string,
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
