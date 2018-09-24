import { juxt } from 'ramda'
import { setCompany as appcuesSetCompany } from './appcues'
import { setCompany as gtmSetCompany } from './googleTagManager'
import { setCompany as fullStorySetCompany } from './fullStory'

/**
 * Set Company data in vendor SDK integrations
 *
 * @param {string} companyId company id
 * @param {string} companyName company name
 * @param {number} userId user id
 *
 */
export default juxt([
  appcuesSetCompany,
  gtmSetCompany,
  fullStorySetCompany,
])

