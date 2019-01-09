import React from 'react'
// import PropTypes from 'prop-types'

import { Button } from 'former-kit'

// import style from '../style.css'

const DoubtButton = () => (
  <div>
    <Button
      type="button"
      size="tiny"
      fill="outline"
      onClick={() => console.log('Sendo clicado....')}
    >
      {/* {t('pages.add_recipient.doubt')} */}
      {'Dúvidas?'}
    </Button>
  </div>
)

DoubtButton.propTypes = {
  // onAddRecipient: PropTypes.func.isRequired,
  // t: PropTypes.func.isRequired,
}

export default DoubtButton
