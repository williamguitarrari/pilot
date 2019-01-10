import React from 'react'
import PropTypes from 'prop-types'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Spacing,
} from 'former-kit'

import style from '../../containers/RecipientList/style.css'

const HelpModal = ({
  isOpen,
  onExit,
  title,
  t,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onExit}
  >
    <ModalTitle
      title={title}
      closeIcon={<IconClose width={16} height={16} />}
      onClose={onExit}
    />
    <ModalContent>
      <hr />
      <small className={style.marginBottomforModal}>{t('pages.recipient_detail.help_subtitle')}</small>
      <h5 className={style.textColor}>{t('pages.recipient_detail.help_manual_title')}</h5>
      <p>{t('pages.recipient_detail.help_manual_text')}</p>
      <h5 className={style.textColor}>{t('pages.recipient_detail.help_automatic_title')}</h5>
      <p>{t('pages.recipient_detail.help_automatic_text')}</p>
      <h5 className={style.textColor}>{t('pages.recipient_detail.help_1025_title')}</h5>
      <p>{t('pages.recipient_detail.help_1025_text')}</p>
      <h5 className={style.textColor}>{t('pages.recipient_detail.help_dx_title')}</h5>
      <p>{t('pages.recipient_detail.help_dx_text')}</p>
    </ModalContent>
    <ModalActions>
      <Spacing />
      <div className={style.justifyContent}>
        <Button fill="gradient" onClick={onExit}>
          {t('pages.recipient_detail.help_exit')}
        </Button>
        <Spacing />
      </div>
    </ModalActions>
  </Modal>
)

HelpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default HelpModal
