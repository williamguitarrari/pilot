import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import copyToClipBoard from 'clipboard-copy'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import {
  always,
  complement,
  compose,
  cond,
  either,
  equals,
  isEmpty,
  isNil,
} from 'ramda'

import ReprocessContainer from '../../containers/Reprocess'
import { withError } from '../ErrorBoundary'

const mapStateToProps = ({
  account: {
    client,
    company: {
      capabilities: {
        allow_reprocess_without_antifraud: allowReprocessWithoutAntifraud,
      },
    } = { capabilities: {} },
  },
}) => ({
  allowReprocessWithoutAntifraud,
  client,
})

const enhanced = compose(
  translate(),
  connect(mapStateToProps, null),
  withRouter,
  withError
)

const isNilOrEmpty = either(isNil, isEmpty)

const stepStatuses = {
  confirmation: {
    confirmation: 'current',
    identification: 'success',
    result: 'pending',
  },
  identification: {
    confirmation: 'pending',
    identification: 'current',
    result: 'pending',
  },
  result: {
    confirmation: 'success',
    identification: 'success',
    result: 'success',
  },
  resultError: {
    confirmation: 'success',
    identification: 'success',
    result: 'error',
  },
}

const equalsIdentification = equals('identification')
const equalsConfirmation = equals('confirmation')

const getPreviousStep = cond([
  [equalsConfirmation, always('identification')],
])

const getNextStep = cond([
  [equalsIdentification, always('confirmation')],
  [equalsConfirmation, always('result')],
])

const Reprocess = ({
  allowReprocessWithoutAntifraud,
  client,
  error,
  history,
  isOpen,
  onClose,
  t,
  transaction,
}) => {
  const [loading, setLoading] = useState(false)
  const [stepStatus, setStepStatus] = useState(stepStatuses.identification)
  const [currentStep, setCurrentStep] = useState('identification')
  const [reprocessedTransactionId, setReprocessedTransactionId] = useState(null)

  const handleBack = () => {
    const previousStep = getPreviousStep(currentStep)

    setStepStatus(stepStatuses[previousStep])
    setCurrentStep(previousStep)
  }

  const handleForward = () => {
    const nextStep = getNextStep(currentStep)

    setStepStatus(stepStatuses[nextStep])
    setCurrentStep(nextStep)
  }

  const handleClose = () => {
    if (stepStatus.result !== 'error') {
      onClose(reprocessedTransactionId)
    } else {
      onClose()
    }
  }

  const handleReprocess = ({ transactionId, withoutAntifraud }) => {
    setLoading(true)

    const reprocessRequest = withoutAntifraud
      ? client.transactions.reprocess({ capture: true, id: transactionId })
      : client.transactions.reprocessWithAntifraud(transactionId)

    reprocessRequest
      .then(({ id }) => {
        setLoading(false)
        setReprocessedTransactionId(id)
        setStepStatus(stepStatuses.result)
      })
      .catch(() => {
        setLoading(false)
        setStepStatus(stepStatuses.resultError)
      })
  }

  const handleCopyId = () => {
    const {
      id: transactionId,
    } = transaction

    const id = reprocessedTransactionId || transactionId

    copyToClipBoard(id)
  }

  const handleReprocessRestart = () => {
    setCurrentStep('identification')
    setStepStatus(stepStatuses.identification)
  }

  const handleViewTransaction = () => {
    history.push(`/transactions/${reprocessedTransactionId}`)
    onClose()
  }

  let statusMessage = ''
  if (error) {
    statusMessage = error.localized
      ? error.localized.message
      : error.message
  }

  return (
    <Fragment>
      {!isNilOrEmpty(transaction)
        && (
          <ReprocessContainer
            allowReprocessWithoutAntifraud={!allowReprocessWithoutAntifraud}
            isOpen={isOpen}
            loading={loading}
            onBack={handleBack}
            onCancel={handleClose}
            onCopyId={handleCopyId}
            onForward={handleForward}
            onRestart={handleReprocessRestart}
            onReprocess={handleReprocess}
            onViewTransaction={handleViewTransaction}
            statusMessage={statusMessage}
            stepStatus={stepStatus}
            t={t}
            transaction={transaction}
          />
        )
      }
    </Fragment>
  )
}

Reprocess.propTypes = {
  allowReprocessWithoutAntifraud: PropTypes.bool.isRequired,
  client: PropTypes.shape({
    transactions: PropTypes.shape({
      details: PropTypes.func.isRequired,
      reprocess: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  error: PropTypes.shape({
    localized: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    amount: PropTypes.number,
    card: PropTypes.shape({
      holder_name: PropTypes.string.isRequired,
    }),
    id: PropTypes.number,
  }).isRequired,
}

Reprocess.defaultProps = {
  error: null,
}

export default enhanced(Reprocess)
