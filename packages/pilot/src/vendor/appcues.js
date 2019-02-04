import hasProperty from './hasProperty'

/**
 * Identify User in Appcues
 *
 * @param {number} userId user id
 * @param {string} userEmail user email
 * @param {string} userName user name
 * @param {string} userDateCreated account created date
 * @param {string} userPermission user permission
 * @param {string} environment current environment
 */
export const identify = (
  userId,
  userEmail,
  userName,
  userDateCreated,
  userPermission,
  environment
) => {
  if (hasProperty(window.Appcues)) {
    window.Appcues.identify(
      userId,
      {
        userEmail,
        userName,
        userDateCreated,
        userPermission,
        environment,
      }
    )
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

/**
 * Triggers appcues page change
 */
export const page = () => {
  if (hasProperty(window.Appcues)) {
    window.Appcues.page()
  }
}
