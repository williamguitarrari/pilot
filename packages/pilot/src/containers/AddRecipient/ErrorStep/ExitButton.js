import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'

const ExitButton = ({
  onExit,
  t,
}) => (
  <div>
    <Button onClick={onExit}>
      {t('pages.add_recipient.exit')}
    </Button>
  </div>
)

ExitButton.propTypes = {
  onExit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default ExitButton
