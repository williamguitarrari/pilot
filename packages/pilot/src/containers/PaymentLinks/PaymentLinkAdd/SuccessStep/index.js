import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Flexbox,
  ModalContent,
} from 'former-kit'
import copyToClipBoard from 'clipboard-copy'
import IconCopy from 'emblematic-icons/svg/Copy24.svg'
import PaymentLinkActionsContainer from '../PaymentLinkActionsContainer'
import ClickableDiv from '../../../../components/ClickableDiv'
import CreatedLinkSvg from './created_link.svg'

import style from './style.css'

const SuccessStep = ({
  onCreateAnotherLink,
  paymentLink,
  t,
}) => (
  <>
    <ModalContent>
      <div className={style.paymentLinkResult}>
        <span className={style.subtitle}>
          {t('pages.payment_links.add_link.success.subtitle')}
        </span>
        <Flexbox alignItems="center" direction="column">
          <div className={style.image}>
            <CreatedLinkSvg />
          </div>
          <ClickableDiv
            className={style.link}
            onClick={() => copyToClipBoard(paymentLink)}
            onKeyPress={() => copyToClipBoard(paymentLink)}
          >
            {paymentLink}
            <IconCopy width="16px" height="16px" />
          </ClickableDiv>
        </Flexbox>
      </div>
    </ModalContent>
    <PaymentLinkActionsContainer>
      <Button onClick={onCreateAnotherLink}>
        {t('pages.payment_links.add_link.success.new_link')}
      </Button>
    </PaymentLinkActionsContainer>
  </>
)

SuccessStep.propTypes = {
  onCreateAnotherLink: PropTypes.func,
  paymentLink: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

SuccessStep.defaultProps = {
  onCreateAnotherLink: () => {},
}

export default SuccessStep
