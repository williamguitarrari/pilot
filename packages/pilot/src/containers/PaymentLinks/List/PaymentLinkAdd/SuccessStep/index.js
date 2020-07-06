import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Flexbox,
  ModalContent,
} from 'former-kit'
import PaymentLinkActionsContainer from '../PaymentLinkActionsContainer'
import LinkCopyUrl from '../../../LinkCopyURL'
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
          <div className={style.link}>
            <LinkCopyUrl
              placement="rightEnd"
              status="active"
              url={paymentLink}
              t={t}
            />
          </div>
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
  onCreateAnotherLink: () => { },
}

export default SuccessStep
