import isPaymentLink from '../../validation/isPaymentLink'

function getPermission (userRole, company, t) {
  const isPaymentLinkSeller = userRole === 'read_write'
    && isPaymentLink(company)

  if (isPaymentLinkSeller) {
    return t('models.user.permission.seller')
  }

  return t(`models.user.permission.${userRole}`)
}

export default getPermission
