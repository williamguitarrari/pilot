import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'former-kit'

const LoginAgainButton = ({
  onLoginAgain,
  t,
}) => (
  <div>
    <Button fill="gradient" onClick={onLoginAgain}>
      {t('pages.add_recipient.login_again')}
    </Button>
  </div>
)

LoginAgainButton.propTypes = {
  onLoginAgain: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default LoginAgainButton
