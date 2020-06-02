import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox } from 'former-kit'
import { map } from 'ramda'
import FeeTitleAndValues from './FeeTitleAndValues'
import CollapsibleCard from '../CollapsibleCard'
import styles from './styles.css'

const translationPathByInstallment = {
  1: 'pages.empty_state.fees.one_installment',
  2: 'pages.empty_state.fees.two_to_six_installments',
  7: 'pages.empty_state.fees.seven_or_more_installments',
}

const buildInstallmentsValues = map(({ installment, mdr }) => ({
  translationPath: translationPathByInstallment[installment],
  type: 'percent',
  value: mdr,
}))

const loadFirstInstallmentMDR = (installments) => {
  if (installments.length < 1) {
    return null
  }

  return installments[0].mdr
}

const loadCreditCardFees = ({ fees, isMDRzao }) => (
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
      ...buildInstallmentsValues(fees.installments),
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

const Fees = ({ fees, isMDRzao, t }) => {
  const subtitle = <span className={styles.subtitle}>{t('pages.empty_state.fees.subtitle')}</span>

  const creditCardFees = loadCreditCardFees({ fees, isMDRzao })

  return (
    <CollapsibleCard
      title={t('pages.empty_state.fees.title')}
      subtitle={subtitle}
    >
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
    </CollapsibleCard>
  )
}

Fees.propTypes = {
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
  isMDRzao: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

Fees.defaultProps = {
  fees: {},
}

export default Fees
