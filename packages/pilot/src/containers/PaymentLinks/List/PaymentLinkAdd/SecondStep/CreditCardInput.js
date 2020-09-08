import React from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  FormInput,
} from 'former-kit'
import { range } from 'ramda'
import Card from 'emblematic-icons/svg/Card32.svg'
import PaymentMethodToggle from './PaymentMethodToggle'
import styles from './style.css'

const feePayerOptions = t => [
  {
    name: t('pages.payment_links.add_link.second_step.company_pays_interest_rate_value'),
    value: 'company',
  },
  {
    name: t('pages.payment_links.add_link.second_step.customer_pays_interest_rate_value'),
    value: 'customer',
  },
]

const buildInstallmentsOptions = (t) => {
  const installmentsRange = range(1, 13)

  return installmentsRange.map((value) => {
    const translationPath = value === 1
      ? 'installment_value_singular'
      : 'installment_value_plural'

    return {
      name: t(`pages.payment_links.add_link.second_step.${translationPath}`, { installment: value }),
      value: String(value),
    }
  })
}

const buildInterestFeesOptions = (
  installments, t
) => {
  const withInterestOptionsRange = range(1, Number(installments) + 1)
  const withInterestOptions = withInterestOptionsRange.map((value) => {
    const translationPath = value === 1
      ? 'installment_options_singular'
      : 'installment_options_plural'

    return {
      name: t(`pages.payment_links.add_link.second_step.${translationPath}`, { installment: value }),
      value: String(value),
    }
  })

  return [
    ...withInterestOptions,
  ]
}

const renderCreditCardInput = (formData, t, canChargeTransaction) => (
  <div className={styles.creditCardContainer}>
    <PaymentMethodToggle
      Icon={Card}
      name="credit_card"
      label={t('pages.payment_links.add_link.second_step.credit_card')}
      t={t}
      value={formData.credit_card}
    />
    {canChargeTransaction && (
      <p>
        {t('pages.payment_links.add_link.second_step.charge_transaction_fee_info_1')}
        <b>{t('pages.payment_links.add_link.second_step.charge_transaction_fee_info_2')}</b>
        {t('pages.payment_links.add_link.second_step.charge_transaction_fee_info_3')}
      </p>
    )}
    <div className={styles.creditCardOptions}>
      {canChargeTransaction && (
        <>
          <Dropdown
            disabled={!formData.credit_card}
            name="fee_payer"
            placeholder={t('pages.payment_links.add_link.second_step.fee_payer_label')}
            options={feePayerOptions(t)}
            value={formData.fee_payer}
          />
          {formData.fee_payer === 'company'
            && (
            <Dropdown
              disabled={!formData.credit_card}
              name="free_installments"
              placeholder={t('pages.payment_links.add_link.second_step.max_free_installments_label')}
              options={buildInterestFeesOptions(12, t)}
              value={formData.free_installments}
            />
            )
          }
        </>
      )}
      {!canChargeTransaction && (
        <>
          <Dropdown
            disabled={!formData.credit_card}
            name="max_installments"
            placeholder={t('pages.payment_links.add_link.second_step.max_installments_label')}
            options={buildInstallmentsOptions(t)}
            value={formData.max_installments}
          />
          <Dropdown
            disabled={!formData.credit_card}
            name="free_installments"
            placeholder={t('pages.payment_links.add_link.second_step.transfer_fees_label')}
            options={buildInterestFeesOptions(formData.max_installments, t)}
          />
          {formData.free_installments > 0 && formData.credit_card && (
            <InterestFees
              name="interest_rate"
              t={t}
            />
          )}
        </>
      )}
    </div>
  </div>
)

const InterestFees = ({
  error,
  name,
  onChange,
  t,
  value,
}) => {
  const internalOnChange = event => onChange(event.target.value.replace(/,/g, '.'))

  return (
    <div className={styles.percentPerMonth}>
      <div>
        {t('pages.payment_links.add_link.second_step.percent_per_month_1')}
        <span>{t('pages.payment_links.add_link.second_step.percent_per_month_2')}</span>
        <div className={styles.formInput}>
          <FormInput name={name} onChange={internalOnChange} type="text" value={value} />
        </div>%
      </div>
      { error && <p>{error}</p> }
    </div>
  )
}

InterestFees.propTypes = {
  error: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  t: PropTypes.func.isRequired,
  value: PropTypes.string,
}

InterestFees.defaultProps = {
  error: '',
  name: '',
  onChange: null,
  value: '',
}

export default renderCreditCardInput
