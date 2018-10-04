import hasProperty from './hasProperty'

/**
 * Identify User in Appcues
 *
 * @param {number} id user id
 * @param {string} email user email
 */
export const identify = (id, email) => {
  if (hasProperty(window.Appcues)) {
    window.Appcues.identify(id, { email })
  }
}

/**
 * Set Company data in Appcues session
 *
 * @param {string} companyId company id
 * @param {string} companyName company name
 * @param {number} userId user id
 *
 */
export const setCompany = (companyId, companyName, userId) => {
  if (hasProperty(window.Appcues)) {
    window.Appcues.identify(
      userId,
      {
        companyId,
        companyName,
      }
    )
  }
}
