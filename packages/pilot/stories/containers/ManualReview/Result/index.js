import React from 'react'
import PropTypes from 'prop-types'
import { identity } from 'ramda'
import { action as storybookAction } from '@storybook/addon-actions'
import ManualReviewResult from '../../../../src/containers/ManualReview/Result'

const ManualReviewResultState = ({ action = 'refused', stepStatusResult }) => (
  <ManualReviewResult
    action={action}
    onRetry={storybookAction('retry')}
    onViewTransaction={storybookAction('view transaction')}
    stepStatusResult={stepStatusResult}
    t={identity}
  />
)

ManualReviewResultState.propTypes = {
  action: PropTypes.oneOf(['approve', 'refuse']).isRequired,
  stepStatusResult: PropTypes.oneOf(['success', 'error']).isRequired,
}

const ManualReviewApproveResult = () => (
  <ManualReviewResultState
    action="approve"
    stepStatusResult="success"
  />
)

const ManualReviewRefuseResult = () => (
  <ManualReviewResultState
    action="refuse"
    stepStatusResult="success"
  />
)

const ManualReviewErrorResult = () => (
  <ManualReviewResultState
    stepStatusResult="error"
  />
)

export {
  ManualReviewApproveResult,
  ManualReviewRefuseResult,
  ManualReviewErrorResult,
}
