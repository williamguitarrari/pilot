import React from 'react'
import PropTypes from 'prop-types'
import { Button, Spacing } from 'former-kit'

const TryAgainAndExitButtons = ({
  onExit,
  onTryAgain,
  t,
}) => (
  <div>
    <Button fill="outline" onClick={onExit}>
      {t('pages.add_recipient.exit')}
    </Button>
    <Spacing size="large" />
    <Button onClick={onTryAgain}>
      {t('pages.add_recipient.try_again')}
    </Button>
  </div>
)

TryAgainAndExitButtons.propTypes = {
  onExit: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default TryAgainAndExitButtons
