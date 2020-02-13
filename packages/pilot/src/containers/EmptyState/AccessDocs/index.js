import React from 'react'
import PropTypes from 'prop-types'
import InfoCard from '../InfoCard'

const AccessDocs = ({ t }) => (
  <InfoCard
    buttonLabel={t('pages.empty_state.access_docs.button_label')}
    buttonLink={t('pages.empty_state.access_docs.documentation_link')}
    subtitle={(
      <span>
        {`${t('pages.empty_state.access_docs.subtitle_part_one')} `}
        <a href={`mailto:${t('pages.empty_state.access_docs.homologation_email')}`}>
          {t('pages.empty_state.access_docs.subtitle_link')}
        </a>
        {` ${t('pages.empty_state.access_docs.subtitle_part_two')}`}
      </span>
    )}
    title={t('pages.empty_state.access_docs.title')}
  />
)

AccessDocs.propTypes = {
  t: PropTypes.func.isRequired,
}

export default AccessDocs
