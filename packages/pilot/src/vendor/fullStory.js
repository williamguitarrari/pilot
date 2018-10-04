import hasProperty from './hasProperty'

/**
 * Identify User in FullStory
 *
 * @param {number} id user id
 * @param {string} email user email
 */
export const identify = (id, email) => {
  if (hasProperty(window.FS)) {
    window.FS.identify(id, { email_str: email })
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

