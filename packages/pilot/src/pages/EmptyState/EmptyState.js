import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  applySpec,
  compose,
  head,
  path,
  propOr,
  pipe,
  prop,
  propEq,
  split,
} from 'ramda'
import { translate } from 'react-i18next'
import EmptyStateContainer from '../../containers/EmptyState'
import { withError } from '../ErrorBoundary'
import environment from '../../environment'

import { selectCompanyFees, selectAnticipationType } from '../Account/actions/reducer'

const getUserName = pipe(prop('name'), split(' '), head)

const hasAdminPermission = propEq('permission', 'admin')

const getAccessKeys = applySpec({
  apiKey: path(['api_key', environment]),
  encryptionKey: path(['encryption_key', environment]),
})

const getAlreadyTransacted = propOr(true, 'alreadyTransacted')

const mapStateToProps = ({
  account: {
    company,
    defaultRecipient,
    user,
  },
  welcome: {
    onboardingAnswers,
  },
}) => ({
  accessKeys: getAccessKeys(company),
  alreadyTransacted: getAlreadyTransacted(company),
  anticipationType: selectAnticipationType({ company, defaultRecipient }),
  company,
  fees: selectCompanyFees({ company, defaultRecipient }),
  isAdmin: hasAdminPermission(user),
  onboardingAnswers,
  userName: getUserName(user),
})

const enhanced = compose(
  translate(),
  connect(mapStateToProps, null),
  withError
)

const hideEmptyState = push => () => {
  localStorage.setItem('hide_empty-state', true)
  return push('/home')
}

const EmptyState = ({
  accessKeys,
  anticipationType,
  fees,
  history: {
    push,
  },
  isAdmin,
  onboardingAnswers,
  t,
  userName,
}) => (
  <EmptyStateContainer
    apiKey={accessKeys.apiKey}
    encryptionKey={accessKeys.encryptionKey}
    environment={environment}
    fees={fees}
    isAdmin={isAdmin}
    isMDRzao={anticipationType === 'compulsory'}
    onboardingAnswers={onboardingAnswers}
    onDisableWelcome={hideEmptyState(push)}
    t={t}
    userName={userName}
  />
)

EmptyState.propTypes = {
  accessKeys: PropTypes.shape({
    apiKey: PropTypes.string,
    encryptionKey: PropTypes.string,
  }),
  anticipationType: PropTypes.string,
  fees: PropTypes.shape({
    anticipation: PropTypes.number,
    antifraud: PropTypes.number,
    boleto: PropTypes.number,
    gateway: PropTypes.number,
    installments: PropTypes.arrayOf(PropTypes.shape({
      installment: PropTypes.number.isRequired,
      mdr: PropTypes.number.isRequired,
    })),
    transfer: PropTypes.number,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onboardingAnswers: PropTypes.shape({}),
  t: PropTypes.func.isRequired,
  userName: PropTypes.string,
}

EmptyState.defaultProps = {
  accessKeys: {},
  anticipationType: '',
  fees: {},
  onboardingAnswers: undefined,
  userName: '',
}

export default enhanced(EmptyState)
