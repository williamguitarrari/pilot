import hasProperty from './hasProperty'

/**
 * Set User identification variables on loginReceive
 * in google tag manager data layer
 *
 * @param {number} id user id
 * @param {string} email user email
 */
export const identify = (id, email) => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push({
      fullstoryUserId: id,
      email,
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
