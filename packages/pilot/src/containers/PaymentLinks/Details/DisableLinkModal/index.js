import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalContent,
  ModalTitle,
  ModalActions,
} from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import styles from './styles.css'

const DisableLinkModal = ({
  isOpen,
  onCancelLink,
  onClose,
  t,
}) => (
  <Modal isOpen={isOpen} size="small">
    <ModalTitle
      title={t('pages.payment_link_detail.disable.title')}
      titleAlign="start"
      closeIcon={<IconClose width={12} height={12} />}
      onClose={onClose}
    />
    <ModalContent>
      <p className={styles.disableMessage}>
        {t('pages.payment_link_detail.disable.disable_message_1')}<br />
        {t('pages.payment_link_detail.disable.disable_message_2')}<br />
        {t('pages.payment_link_detail.disable.disable_message_3')}
      </p>
    </ModalContent>
    <ModalActions>
      <Button fill="outline" onClick={onClose}>
        {t('pages.payment_link_detail.disable.cancel')}
      </Button>
      <Button onClick={onCancelLink}>
        {t('pages.payment_link_detail.disable.confirm')}
      </Button>
    </ModalActions>
  </Modal>
)

DisableLinkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancelLink: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default DisableLinkModal
