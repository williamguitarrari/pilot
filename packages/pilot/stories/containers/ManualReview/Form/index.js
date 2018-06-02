import React from 'react'
import PropTypes from 'prop-types'
import { identity } from 'ramda'
import { action as storybookAction } from '@storybook/addon-actions'
import { Card } from 'former-kit'
import ManualReviewForm from '../../../../src/containers/ManualReview/Form'

const ManualReviewFormState = ({ action }) => (
  <Card>
    <ManualReviewForm
      action={action}
      onConfirm={storybookAction('submit')}
      transactionId={1234567}
      t={identity}
    />
  </Card>
)

ManualReviewFormState.propTypes = {
  action: PropTypes.oneOf(['approve', 'refuse']).isRequired,
}

const ManualReviewApproveForm = () => (
  <ManualReviewFormState
    action="approve"
  />
)

const ManualReviewRefuseForm = () => (
  <ManualReviewFormState
    action="refuse"
  />
)

export { ManualReviewApproveForm, ManualReviewRefuseForm }
