import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Flexbox,
  ModalTitle,
  ModalContent,
  ModalActions,
} from 'former-kit'
import copyToClipBoard from 'clipboard-copy'

import IconCopy from 'emblematic-icons/svg/Copy24.svg'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import CreatedLinkSvg from './created_link.svg'

import style from './style.css'

const Result = ({ onCreateLink, paymentLink, t }) => (
  <>
    <ModalTitle
      title={t('pages.payment_links.add_link.success.title')}
      titleAlign="start"
      closeIcon={<IconClose width={12} height={12} />}
      onClose={v => v}
    />
    <ModalContent>
      <div className={style.paymentLinkResult}>
        <span className={style.subtitle}>
          {t('pages.payment_links.add_link.success.subtitle')}
        </span>
        <Flexbox alignItems="center" direction="column">
          <div className={style.image}>
            <CreatedLinkSvg />
          </div>
          <div
            className={style.link}
            onClick={() => copyToClipBoard(paymentLink)}
            onKeyPress={() => copyToClipBoard(paymentLink)}
            role="button"
            tabIndex={0}
          >
            {paymentLink}
            <IconCopy width="16px" height="16px" />
          </div>
        </Flexbox>
      </div>
    </ModalContent>
    <ModalActions>
      <Flexbox className={style.paymentLinkActions}>
        <Button onClick={onCreateLink}>
          {t('pages.payment_links.add_link.success.new_link')}
        </Button>
      </Flexbox>
    </ModalActions>
  </>
)

Result.propTypes = {
  onCreateLink: PropTypes.func.isRequired,
  paymentLink: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default Result
