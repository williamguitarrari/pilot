import React from 'react'
import PropTypes from 'prop-types'
import AccessKeys from './AccessKeys'

const EmptyState = ({
  apiKey,
  encryptionKey,
  environment,
  t,
}) => (
  <div>
    <AccessKeys
      apiKey={apiKey}
      encryptionKey={encryptionKey}
      environment={environment}
      t={t}
    />
  </div>
)

EmptyState.propTypes = {
  apiKey: PropTypes.string,
  encryptionKey: PropTypes.string,
  environment: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

EmptyState.defaultProps = {
  apiKey: '',
  encryptionKey: '',
}

export default EmptyState
