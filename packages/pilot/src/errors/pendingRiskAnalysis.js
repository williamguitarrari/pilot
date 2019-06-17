import React from 'react'
import GenericError from '../pages/Errors/GenericError'

export default [
  {
    affectedRoutes: [/./],
    getComponent: localized => (
      <GenericError
        {...localized}
      />
    ),
    localized: t => ({
      message: t('pages.error.pending_risk_analysis'),
      title: t('pages.error.pending_risk_analysis_title'),
    }),
    message: /Pending risk analysis/,
    method: /./,
    name: /./,
    status: /./,
    type: /unknown/,
  },
]
