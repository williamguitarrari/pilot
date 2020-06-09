import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Flexbox,
  ModalContent,
} from 'former-kit'
import PaymentLinkActionsContainer from '../PaymentLinkActionsContainer'
import ErrorLinkSvg from './error_link.svg'

import style from './style.css'

const ErrorStep = ({
  onCreateAnotherLink,
  t,
}) => (
  <>
    <ModalContent>
      <div className={style.paymentLinkResult}>
        <Flexbox alignItems="center" direction="column">
          <div className={style.image}>
            <ErrorLinkSvg />
          </div>
          <span className={style.errorInfo}>
            {t('pages.payment_links.add_link.error.error_info_1')}<br />
            {t('pages.payment_links.add_link.error.error_info_2')}
          </span>
        </Flexbox>
      </div>
    </ModalContent>
    <PaymentLinkActionsContainer>
      <Button fill="outline" onClick={onCreateAnotherLink}>
        {t('pages.payment_links.add_link.error.retry_button')}
      </Button>
    </PaymentLinkActionsContainer>
  </>
)

ErrorStep.propTypes = {
  onCreateAnotherLink: PropTypes.func,
  t: PropTypes.func.isRequired,
}

ErrorStep.defaultProps = {
  onCreateAnotherLink: () => {},
}

export default ErrorStep
