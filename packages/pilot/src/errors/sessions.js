import React from 'react'

import GenericError from '../pages/Errors/GenericError'

export default [
  {
    affectedRoutes: [/./],
    getComponent: localized => <GenericError {...localized} />,
    localized: t => ({
      message: t('pages.error.unauthorized'),
      title: t('pages.error.unauthorized_title'),
    }),
    message: /Sessão inválida/,
    method: /get/,
    name: /ApiError/,
    status: /401/,
    type: /action_forbidden/,
  },
]
