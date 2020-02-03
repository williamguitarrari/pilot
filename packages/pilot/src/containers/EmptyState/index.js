import React from 'react'
import PropTypes from 'prop-types'
import AccessDocs from './AccessDocs'
import Fees from './Fees'
import AccessKeys from './AccessKeys'
import styles from './styles.css'

const EmptyState = ({
  apiKey,
  encryptionKey,
  environment,
  fees,
  t,
}) => (
  <div className={styles.accountInfo}>
    <AccessDocs t={t} />
    <Fees fees={fees} t={t} />
    <AccessKeys
      apiKey={apiKey}
      encryptionKey={encryptionKey}
      environment={environment}
      t={t}
    />
  </div>
)

EmptyState.propTypes = {
  apiKey: PropTypes.string,
  encryptionKey: PropTypes.string,
  environment: PropTypes.string.isRequired,
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
  t: PropTypes.func.isRequired,
}

EmptyState.defaultProps = {
  apiKey: '',
  encryptionKey: '',
  fees: {},
}

export default EmptyState
