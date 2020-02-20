import React from 'react'
import PropTypes from 'prop-types'
import InfoCard from '../InfoCard'

const AccessWelcomeMaterial = ({ t }) => (
  <InfoCard
    buttonLabel={t('pages.empty_state.access_material.button_label')}
    buttonLink={t('pages.empty_state.access_material.material_link')}
    subtitle={(
      <span>
        {t('pages.empty_state.access_material.subtitle')}
      </span>
    )}
    title={t('pages.empty_state.access_material.title')}
  />
)

AccessWelcomeMaterial.propTypes = {
  t: PropTypes.func.isRequired,
}

export default AccessWelcomeMaterial
