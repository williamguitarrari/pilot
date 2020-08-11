import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
  applySpec,
  compose,
  path,
  values,
} from 'ramda'
import { Layout } from 'former-kit'

import { ErrorBoundary } from '../ErrorBoundary'
import Sidebar from './Sidebar'
import Header from './Header'
import Loader from '../../components/Loader'
import environment from '../../environment'
import buildRoutes from './routes'

// This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
// It was commented on to remove the anticipation limits call on Balance page
// This code will be used again in the future when ATLAS project implements the anticipation flow
// More details in issue #1159
// const getAnticipationLimit = path(['anticipation', 'limits', 'max'])
const getRecipientId = path(['account', 'company', 'default_recipient_id', environment])
const getBalance = path(['account', 'balance'])
const getCompany = path(['account', 'company'])
const getAuthenticatedUser = path(['account', 'user'])
const getAccountSessionId = path(['account', 'sessionId'])
const getTransfersPricing = path(['account', 'company', 'pricing', 'transfers'])

const mapStateToProps = applySpec({
  // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // It was commented on to remove the anticipation limits call on Balance page
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // anticipationLimit: getAnticipationLimit,
  balance: getBalance,
  company: getCompany,
  recipientId: getRecipientId,
  sessionId: getAccountSessionId,
  transfersPricing: getTransfersPricing,
  user: getAuthenticatedUser,
})

const enhanced = compose(
  translate(),
  withRouter,
  connect(mapStateToProps)
)

const LoggedArea = ({
  // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // It was commented on to remove the anticipation limits call on Balance page
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // anticipationLimit,
  balance,
  company,
  recipientId,
  sessionId,
  t,
  transfersPricing,
  user,
}) => {
  const routes = buildRoutes({
    company,
    environment,
    user,
  })

  return (
    <Layout
      sidebar={(
        <Sidebar
          // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
          // It was commented on to remove the anticipation limits call on Balance page
          // This code will be used again in the future when ATLAS project implements the anticipation flow
          // More details in issue #1159
          // anticipationLimit={anticipationLimit}
          companyName={prop('name', company)}
          companyType={prop('type', company)}
          balance={balance}
          recipientId={recipientId}
          t={t}
          transfersPricing={transfersPricing}
          user={user}
          routes={values(routes)}
        />
      )}
      header={(
        <Header
          t={t}
          routes={routes}
          sessionId={sessionId}
        />
      )}
    >
      <ErrorBoundary>
        <Suspense
          fallback={(
            <Loader
              position="relative"
              visible
            />
          )}
        >
          <Switch>
            {values(routes).map(({ component, path: pathURI }) => (
              <Route
                key={pathURI}
                path={pathURI}
                component={component}
              />
            ))}
            <Redirect to="/home" />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}

LoggedArea.propTypes = {
  // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // It was commented on to remove the anticipation limits call on Balance page
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // anticipationLimit: PropTypes.number,
  balance: PropTypes.shape({
    available: PropTypes.number,
  }),
  company: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  recipientId: PropTypes.string,
  sessionId: PropTypes.string,
  t: PropTypes.func.isRequired,
  transfersPricing: PropTypes.shape({
    ted: PropTypes.number,
  }),
  user: PropTypes.shape({
    permission: PropTypes.string,
  }),
}

LoggedArea.defaultProps = {
  // This block of code is commented because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // It was commented on to remove the anticipation limits call on Balance page
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // anticipationLimit: null,
  balance: {},
  company: {},
  recipientId: null,
  sessionId: '',
  transfersPricing: {},
  user: {},
}

export default enhanced(LoggedArea)
