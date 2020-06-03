import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox } from 'former-kit'
import FeeTitleAndValues from './FeeTitleAndValues'
import styles from './styles.css'

const installmentsTranslations = {
  DEFAULT: {
    1: 'pages.empty_state.fees.one_installment',
    2: 'pages.empty_state.fees.two_to_six_installments',
    7: 'pages.empty_state.fees.seven_or_more_installments',
  },
  MDRZAO: {
    1: 'pages.empty_state.fees.mdrzao_installment',
  },
}

const buildInstallmentsValues = (
  anticipationType,
  installments
) => installments.map(item => ({
  translationPath: installmentsTranslations[anticipationType][item.installment],
  type: 'percent',
  value: item.mdr,
}))

const loadFirstInstallmentMDR = (installments) => {
  if (installments.length < 1) {
    return null
  }

  return installments[0].mdr
}

const buildCreditCardFees = ({ fees, isMDRzao }) => (
  isMDRzao
    ? [
      {
        translationPath: 'pages.empty_state.fees.mdrzao_installment',
        type: 'percent',
        value: loadFirstInstallmentMDR(fees.installments),
        valueSuffixPath: 'pages.empty_state.fees.per_transaction',
      },
    ]
    : [
      ...buildInstallmentsValues('DEFAULT', fees.installments),
      {
        translationPath: 'pages.empty_state.fees.processing',
        type: 'currency',
        value: fees.gateway,
      },
      {
        translationPath: 'pages.empty_state.fees.antifraud',
        type: 'currency',
        value: fees.antifraud,
      },
    ])

const FeesDetails = ({ fees, isMDRzao, t }) => {
  const creditCardFees = buildCreditCardFees({ fees, isMDRzao })

  return (
    <div>
      <FeeTitleAndValues
        t={t}
        title={t('pages.empty_state.fees.credit_card')}
        values={creditCardFees}
      />
      <Flexbox className={styles.marginRight}>
        <FeeTitleAndValues
          t={t}
          title={t('pages.empty_state.fees.boleto')}
          values={[
            {
              translationPath: 'pages.empty_state.fees.paid',
              type: 'currency',
              value: fees.boleto,
            },
          ]}
        />
        <FeeTitleAndValues
          t={t}
          title={t('pages.empty_state.fees.anticipation')}
          values={[
            {
              translationPath: 'pages.empty_state.fees.tax',
              type: 'percent',
              value: fees.anticipation,
              valueSuffixPath: isMDRzao ? 'pages.empty_state.fees.per_installment' : '',
            },
          ]}
        />
        <FeeTitleAndValues
          t={t}
          title={t('pages.empty_state.fees.transfers')}
          values={[
            {
              translationPath: 'pages.empty_state.fees.doc_ted',
              type: 'currency',
              value: fees.transfer,
            },
          ]}
        />
      </Flexbox>
    </div>
  )
}

FeesDetails.propTypes = {
  fees: PropTypes.shape({
    anticipation: PropTypes.number,
    antifraud: PropTypes.number,
    boleto: PropTypes.number,
    gateway: PropTypes.number,
    installments: PropTypes.arrayOf(PropTypes.shape({
      installment: PropTypes.number.isRequired,
      mdr: PropTypes.number.isRequired,
    })),
    transfer: PropTypes.number,
  }),
  isMDRzao: PropTypes.bool,
  t: PropTypes.func.isRequired,
}

FeesDetails.defaultProps = {
  fees: {
    anticipation: null,
    antifraud: null,
    boleto: null,
    gateway: null,
    installments: [],
    transfer: null,
  },
  isMDRzao: false,
}

export default FeesDetails
