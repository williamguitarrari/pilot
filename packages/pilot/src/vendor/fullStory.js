import hasProperty from './hasProperty'

/**
 * Identify User in FullStory
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
  if (hasProperty(window.FS)) {
    window.FS.identify(
      id,
      {
        email_str: email,
        userName_str: userName,
        userDateCreated_str: userDateCreated,
        userPermission_str: userPermission,
        environment_str: environment,
      }
    )
  }
}

/**
 * Set Company data in FullStory session
 *
 * @param {string} id company id
 * @param {string} name company name
 *
 */
export const setCompany = (id, name) => {
  if (hasProperty(window.FS)) {
    window.FS.setUserVars({
      companyId_str: id,
      companyName_str: name,
    })
  }
}

