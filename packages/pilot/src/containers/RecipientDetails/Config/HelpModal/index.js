import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import {
  Button,
  Flexbox,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Spacing,
} from 'former-kit'

import style from '../style.css'

import ImageAutomaticOne from './img/automatic_10_25_1.svg'
import ImageAutomaticTwo from './img/automatic_10_25_2.svg'
import ImageAutomaticThree from './img/automatic_10_25_3.svg'
import ImageAutomaticDx from './img/automatic_dx.svg'

const renderManualByVolume = t => (
  <Fragment>
    <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.manual_by_volume')}</h5>
    <p>{t('pages.recipient_detail.manual_by_volume_explanation_1')}</p>
    <p>{t('pages.recipient_detail.manual_by_volume_explanation_2')}</p>
  </Fragment>
)

const renderAutomaticByVolume = t => (
  <Fragment>
    <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.automatic_by_volume')}</h5>
    <p>{t('pages.recipient_detail.automatic_by_volume_explanation')}
      <a
        href={t('pages.recipient_detail.help_link')}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('pages.recipient_detail.automatic_by_volume_explanation_link')}
      </a>
    </p>
  </Fragment>
)

const render1025 = t => (
  <Fragment>
    <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.anticipation_1025')}</h5>
    <p>{t('pages.recipient_detail.anticipation_1025_explanation')}</p>
    <Flexbox justifyContent="center">
      <ImageAutomaticOne className={style.imgSize} />
      <ImageAutomaticTwo className={style.imgSize} />
      <ImageAutomaticThree className={style.imgSize} />
    </Flexbox>
  </Fragment>
)

const renderDX = t => (
  <Fragment>
    <h5 className={style.modalSubtitles}>{t('pages.recipient_detail.anticipation_dx')}</h5>
    <p>{t('pages.recipient_detail.anticipation_dx_explanation')}</p>
    <Flexbox justifyContent="center">
      <ImageAutomaticDx className={style.imgSize} />
    </Flexbox>
  </Fragment>
)

const renderAllAnticipationModels = (canConfigureAnticipation, t) => {
  if (canConfigureAnticipation) {
    return (
      <Fragment>
        {renderManualByVolume(t)}
        <Spacing />
        {renderAutomaticByVolume(t)}
        <Spacing />
        {render1025(t)}
        <Spacing />
        {renderDX(t)}
      </Fragment>
    )
  }

  return (
    <Fragment>
      {renderManualByVolume(t)}
      <Spacing />
      {renderAutomaticByVolume(t)}
    </Fragment>
  )
}

const HelpModal = ({
  canConfigureAnticipation,
  isOpen,
  onExit,
  size,
  t,
  title,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onExit}
    size={size}
  >
    <ModalTitle
      title={title}
      closeIcon={<IconClose width={16} height={16} />}
      onClose={onExit}
    />
    <hr />
    <div className={style.modalHeight}>
      <ModalContent>
        <small className={style.marginBottomforModal}>
          {t('pages.recipient_detail.subtitle_modal')}
        </small>
        {renderAllAnticipationModels(canConfigureAnticipation, t)}
      </ModalContent>
      <ModalActions>
        <div className={style.justifyContent}>
          <Button fill="gradient" onClick={onExit}>
            {t('pages.recipient_detail.exit_modal')}
          </Button>
          <Spacing />
        </div>
      </ModalActions>
    </div>
  </Modal>
)

HelpModal.propTypes = {
  canConfigureAnticipation: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default HelpModal
