import React from 'react'
import PropTypes from 'prop-types'
import { action } from '@storybook/addon-actions'
import Reprocess from '../../../src/containers/Reprocess'

const ReprocessState = ({
  statusMessage,
  stepStatus,
}) => (
  <Reprocess
    isOpen
    loading={false}
    onCancel={action('cancel')}
    onConfirm={action('submit')}
    onCopyId={action('copy id')}
    onRestart={action('reprocess restart')}
    onViewTransaction={action('view transaction')}
    statusMessage={statusMessage}
    stepStatus={stepStatus}
    transaction={{
      amount: 2000000,
      card: {
        first_digits: '123456',
        holder_name: 'Lorem Ipsum de Consectetuer e Amet',
        last_digits: '7890',
      },
      id: 1,
      payment: {
        installments: 48,
      },
    }}
    t={translations => translations}
  />
)

ReprocessState.propTypes = {
  statusMessage: PropTypes.string,
  stepStatus: PropTypes.shape({
    confirmation: PropTypes.string,
    result: PropTypes.string,
  }),
}

ReprocessState.defaultProps = {
  statusMessage: '',
  stepStatus: {
    confirmation: 'current',
    result: null,
  },
}

export default ReprocessState
