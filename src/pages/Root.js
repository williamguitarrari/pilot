import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'

import { connect } from 'react-redux'

import { compose } from 'ramda'

import Account from './Account'
import LoggedArea from './LoggedArea'

const enhance = compose(
  withRouter,
  connect(({ account: { client, user } }) => ({ client, user }))
)

function Root ({ client, user, location }) {
  const { pathname: path } = location
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

Root.propTypes = {
  client: PropTypes.object, // eslint-disable-line
  user: PropTypes.object, // eslint-disable-line
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

Root.defaultProps = {
  client: null,
  user: null,
  location: {},
}

export default enhance(Root)
