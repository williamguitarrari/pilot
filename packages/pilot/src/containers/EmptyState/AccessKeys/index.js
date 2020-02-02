import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox } from 'former-kit'
import KeyLabelAndValue from './KeyLabelAndValue'
import CollapsibleCard from '../CollapsibleCard'
import styles from './styles.css'

const AccessKeys = ({
  apiKey,
  encryptionKey,
  environment,
  t,
}) => {
  const subtitle = (
    <span className={styles.subtitle}>
      {`${t('pages.empty_state.access_keys.subtitle')} `}
      <strong>{t('pages.empty_state.access_keys.subtitle_strong')}</strong>
    </span>
  )

  return (
    <CollapsibleCard
      title={t('pages.empty_state.access_keys.title')}
      subtitle={subtitle}
    >
      <Flexbox
        alignItems="center"
        justifyContent="space-between"
        className={styles.acessKeys}
      >
        <p>{t(`pages.empty_state.access_keys.${environment}`)}</p>
        <Flexbox className={styles.keysArea}>
          <KeyLabelAndValue
            label={t('pages.empty_state.access_keys.api')}
            value={apiKey}
          />
          <KeyLabelAndValue
            label={t('pages.empty_state.access_keys.encryption')}
            value={encryptionKey}
          />
        </Flexbox>
      </Flexbox>
    </CollapsibleCard>
  )
}

AccessKeys.propTypes = {
  apiKey: PropTypes.string,
  encryptionKey: PropTypes.string,
  environment: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

AccessKeys.defaultProps = {
  apiKey: '',
  encryptionKey: '',
}

export default AccessKeys
