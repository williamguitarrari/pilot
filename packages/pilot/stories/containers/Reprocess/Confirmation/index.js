import React from 'react'
import PropTypes from 'prop-types'
import { action } from '@storybook/addon-actions'

import ReprocessConfirmation from '../../../../src/containers/Reprocess/Confirmation'

const Reprocess = ({ allowReprocessWithoutAntifraud }) => (
  <ReprocessConfirmation
    allowReprocessWithoutAntifraud={allowReprocessWithoutAntifraud}
    onReprocess={action('reprocess')}
    onBack={action('back')}
    t={translations => translations}
  />
)

Reprocess.propTypes = {
  allowReprocessWithoutAntifraud: PropTypes.bool,
}

Reprocess.defaultProps = {
  allowReprocessWithoutAntifraud: false,
}

export default Reprocess
