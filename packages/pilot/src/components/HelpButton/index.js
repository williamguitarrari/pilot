import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'former-kit'

const HelpButton = ({
  openHelpModal,
  t,
}) => (
  <Button
    type="button"
    size="tiny"
    fill="outline"
    onClick={openHelpModal}
  >
    {t('pages.recipient_detail.help')}
  </Button>
)

HelpButton.propTypes = {
  openHelpModal: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default HelpButton
