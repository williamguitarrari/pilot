import React from 'react'
import PropTypes from 'prop-types'
import InfoCard from '../InfoCard'
import documentationsSettings from './documentationsSettings'
import styles from './styles.css'

const renderPlatformIntegrationDocs = (settings, t) => (
  <InfoCard
    buttonLabel={t('pages.empty_state.access_docs_platform.button_label')}
    buttonLink={t(settings.link)}
    subtitle={(
      <span className={styles.subtitle}>
        {t('pages.empty_state.access_docs_platform.subtitle')}
      </span>
      )}
    title={t('pages.empty_state.access_docs_platform.title', {
      platformLabel: t(settings.platformLabel),
    })}
  />
)

const AccessDocs = ({ onboardingAnswers, t }) => {
  const { platform } = onboardingAnswers
  const settings = documentationsSettings[platform]

  if (settings) return renderPlatformIntegrationDocs(settings, t)

  return (
    <InfoCard
      buttonLabel={t('pages.empty_state.access_docs.button_label')}
      buttonLink={t('pages.empty_state.access_docs.documentation_link')}
      subtitle={(
        <span className={styles.subtitle}>
          {t('pages.empty_state.access_docs.subtitle_part_one')}
          <a href={`mailto:${t('pages.empty_state.access_docs.homologation_email')}`}>
            {t('pages.empty_state.access_docs.subtitle_link')}
          </a>
          {t('pages.empty_state.access_docs.subtitle_part_two')}
        </span>
    )}
      title={t('pages.empty_state.access_docs.title')}
    />
  )
}

AccessDocs.propTypes = {
  onboardingAnswers: PropTypes.shape({
    platform: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default AccessDocs
