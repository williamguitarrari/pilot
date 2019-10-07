export default [
  {
    affectedRoutes: [/\/transactions\/\w+/],
    localized: t => ({
      message: t('pages.transaction.errors.not_found'),
      title: t('error'),
    }),
    message: /./,
    method: /./,
    name: /./,
    status: /404|500/,
    type: /not_found|internal_error|unknown/,
  },
]
