import React from 'react'
import PropTypes from 'prop-types'

import {
  Alert,
  Button,
} from 'former-kit'

import IconInfo from 'emblematic-icons/svg/Info32.svg'


import style from './style.css'

const SaveAlert = ({
  isOpen,
  onExit,
  t,
}) => (
  <div
    className={style.alert}
    isOpen={isOpen}
  >
    <Alert
      type="info"
      icon={<IconInfo height={16} width={16} />}
    >
      <p><strong>Configuração alterada com sucesso</strong></p>
      <Button fill="gradient" onClick={onExit}>
        {t('pages.recipient_detail.help_exit')}
      </Button>
    </Alert>
  </div>
)

SaveAlert.propTypes = {
  isOpen: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default SaveAlert
