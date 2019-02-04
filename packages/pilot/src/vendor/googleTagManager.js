import hasProperty from './hasProperty'

/**
 * Set User identification variables on loginReceive
 * in google tag manager data layer
 *
 * @param {number} id user id
 * @param {string} email user email
 * @param {string} userName user name
 * @param {string} userDateCreated account created date
 * @param {string} userPermission user permission
 * @param {string} environment current environment
 */
export const identify = (
  id,
  email,
  userName,
  userDateCreated,
  userPermission,
  environment
) => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push({
      fullstoryUserId: id,
      email,
      userName,
      userDateCreated,
      userPermission,
      environment,
      event: 'loginReceive',
    })
  }
}

/**
 * Set Company identification variables on accountReceive
 * in google tag manager data layer
 * @param {string} id company id
 * @param {string} name company name
 */
export const setCompany = (id, name) => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push({
      companyId: id,
      companyName: name,
      event: 'accountReceive',
    })
  }
}

/**
 * Triggers inactiveCompanyLogin event
 */
export const inactiveCompanyLogin = () => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push({
      event: 'inactiveCompanyLogin',
    })
  }
}

/**
 * Trigger activeCompanyLogin event
 */

export const activeCompanyLogin = () => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push({
      event: 'activeCompanyLogin',
    })
  }
}
