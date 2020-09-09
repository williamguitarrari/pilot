import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardTitle,
} from 'former-kit'
import percent from '../../../../formatters/percent'
import styles from './styles.css'

const renderCreditCardMessage = (creditCardConfig, t) => {
  const {
    charge_transaction_fee: chargeTransactionFee,
    free_installments: freeInstalments,
    interest_rate: interestRate,
    max_installments: maxInstallments,
  } = creditCardConfig

  if (freeInstalments == null) {
    return (
      <>
        {t('pages.payment_link_detail.payment_methods.max_of')}
        <span>{maxInstallments}</span>
        {t('pages.payment_link_detail.payment_methods.no_interest_rate', { count: maxInstallments })}
      </>
    )
  }

  if (chargeTransactionFee) {
    return (
      <>
        {t('pages.payment_link_detail.payment_methods.with_interest_rate_2')}
        <span>
          {t('pages.payment_link_detail.payment_methods.to', {
            from: 1,
            to: freeInstalments > 0
              ? freeInstalments
              : maxInstallments,
          })}
        </span>
        {freeInstalments === 0
          ? t('pages.payment_link_detail.payment_methods.charge_transaction_fee_interest_rate_2')
          : t('pages.payment_link_detail.payment_methods.charge_transaction_fee_interest_rate_1')
          }
        <br />
        {freeInstalments > 0 && freeInstalments < 12 && (
          <>
            {t('pages.payment_link_detail.payment_methods.with_interest_rate_2')}
            <span>
              {t('pages.payment_link_detail.payment_methods.to', {
                from: freeInstalments + 1,
                to: maxInstallments,
              })}
            </span>
            {t('pages.payment_link_detail.payment_methods.charge_transaction_fee_interest_rate_1')}
          </>
        )}
      </>
    )
  }

  return (
    <>
      {t('pages.payment_link_detail.payment_methods.max_of')}
      <span>{maxInstallments}</span>
      {t('pages.payment_link_detail.payment_methods.installment', { count: maxInstallments })}
      {t('pages.payment_link_detail.payment_methods.with_interest_rate_1')}
      <span>
        {freeInstalments}
      </span>
      {t('pages.payment_link_detail.payment_methods.installment', { count: freeInstalments })}
      <br />
      {t('pages.payment_link_detail.payment_methods.with_interest_rate_2')}
      <span>
        {t('pages.payment_link_detail.payment_methods.to', {
          from: freeInstalments + 1,
          to: maxInstallments,
        })}
      </span>
      {t('pages.payment_link_detail.payment_methods.with_interest_rate_3', {
        percent: percent(interestRate),
      })}
    </>
  )
}

const PaymentMethods = ({
  boletoConfig,
  creditCardConfig,
  t,
}) => (
  <Card>
    <CardTitle title={t('pages.payment_link_detail.payment_methods.title')} />
    <CardContent>
      <div className={styles.row}>
        <div>
          <p className={styles.title}>
            {t('pages.payment_link_detail.payment_methods.credit_title')}
          </p>
          <p className={styles.subtitle}>
            {t('pages.payment_link_detail.payment_methods.credit_subtitle')}
          </p>
          <span className={styles.content}>
            {creditCardConfig
              ? renderCreditCardMessage(creditCardConfig, t)
              : '-'
            }
          </span>
        </div>
        <div>
          <p className={styles.title}>
            {t('pages.payment_link_detail.payment_methods.boleto_title')}
          </p>
          <p className={styles.subtitle}>
            {t('pages.payment_link_detail.payment_methods.boleto_subtitle')}
          </p>
          <span className={styles.content}>
            { boletoConfig
              ? boletoConfig.expires_in
              : '-'
            }
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
)

PaymentMethods.propTypes = {
  boletoConfig: PropTypes.shape({
    expires_in: PropTypes.number,
  }),
  creditCardConfig: PropTypes.shape({
    charge_transaction_fee: PropTypes.bool,
    free_installments: PropTypes.number,
    interest_rate: PropTypes.number,
    max_installments: PropTypes.number,
  }),
  t: PropTypes.func.isRequired,
}

PaymentMethods.defaultProps = {
  boletoConfig: null,
  creditCardConfig: null,
}

export default PaymentMethods
