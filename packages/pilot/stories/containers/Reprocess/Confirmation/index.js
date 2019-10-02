import React from 'react'
import PropTypes from 'prop-types'
import { action } from '@storybook/addon-actions'

import ReprocessConfirmation from '../../../../src/containers/Reprocess/Confirmation'

const Reprocess = ({ isReprocessingWithoutAntifraud }) => (
  <ReprocessConfirmation
    isReprocessingWithoutAntifraud={isReprocessingWithoutAntifraud}
    onReprocess={action('reprocess')}
    onBack={action('back')}
    t={translations => translations}
  />
)

Reprocess.propTypes = {
  isReprocessingWithoutAntifraud: PropTypes.bool,
}

Reprocess.defaultProps = {
  isReprocessingWithoutAntifraud: false,
}

export default Reprocess
