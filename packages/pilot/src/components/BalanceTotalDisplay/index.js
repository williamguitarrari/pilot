import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardContent,
  CardTitle,
} from 'former-kit'
import currencyToParts from '../../formatters/currencyToParts'

import style from './style.css'

const BalanceTotalDisplay = ({
  action,
  amount,
  detail,
  disabled,
  isCompanyPaymentLink,
  paymentLinkDisclaimer,
  title,
}) => {
  const { symbol, value } = currencyToParts(Math.abs(amount))
  return (
    <Fragment>
      <CardTitle
        className={style.title}
        title={title}
      />
      <CardContent>
        <span className={style.symbol}>
          {symbol}
        </span>
        <span className={style.amount}>
          {value}
        </span>
        <div className={style.detail}>
          {detail}
        </div>
        {isCompanyPaymentLink && (
          <span className={style.detail}>
            {paymentLinkDisclaimer}
          </span>
        )}
        {!isCompanyPaymentLink && action
          && (
            <Button
              disabled={disabled}
              onClick={action.onClick}
              size="default"
            >
              {action.title}
            </Button>
          )
        }
      </CardContent>
    </Fragment>
  )
}

BalanceTotalDisplay.propTypes = {
  action: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }),
  amount: PropTypes.number.isRequired,
  detail: PropTypes.node,
  // The detail property was changed to not be required
  // because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // This component is imported in Balance container and need to
  // not pass this property until this issue is reverted
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // detail: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  isCompanyPaymentLink: PropTypes.bool,
  paymentLinkDisclaimer: PropTypes.string,
  title: PropTypes.string.isRequired,
}

BalanceTotalDisplay.defaultProps = {
  action: null,
  // The detail property was changed to not be required
  // because of issue #1159 (https://github.com/pagarme/pilot/issues/1159)
  // This component is imported in Balance container and need to
  // not pass this property until this issue is reverted
  // This code will be used again in the future when ATLAS project implements the anticipation flow
  // More details in issue #1159
  // detail: PropTypes.node.isRequired,
  detail: null,
  disabled: false,
  isCompanyPaymentLink: false,
  paymentLinkDisclaimer: '',
}

export default BalanceTotalDisplay
