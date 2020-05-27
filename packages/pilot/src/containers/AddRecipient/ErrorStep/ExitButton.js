import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'

const ExitButton = ({
  onExit,
  t,
}) => (
  <div>
    <Button onClick={onExit} fill="outline">
      {t('pages.add_recipient.go_back')}
    </Button>
  </div>
)

ExitButton.propTypes = {
  onExit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default ExitButton
