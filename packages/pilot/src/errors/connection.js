import React from 'react'

import NoConnection from '../pages/Errors/NoConnection'

export default [
  {
    affectedRoutes: [/./],
    getComponent: () => <NoConnection />,
    message: /./,
    method: /./,
    name: 'TypeError',
    status: undefined,
    type: /unknown/,
    validation: () => !navigator.onLine,
  },
]
