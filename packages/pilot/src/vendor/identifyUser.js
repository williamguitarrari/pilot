import { juxt } from 'ramda'
import { identify as appcuesIdentify } from './appcues'
import { identify as gtmIdentify } from './googleTagManager'
import { identify as fullStoryIdentify } from './fullStory'

/**
 * Identify User in vendor SDK integrations
 *
 * @param {number} userId user id
 * @param {string} userEmail user email
 * @param {string} userName user name
 * @param {string} userDateCreated account created date
 * @param {string} userPermission user permission
 * @param {string} environment current environment
  */
export default juxt([
  appcuesIdentify,
  gtmIdentify,
  fullStoryIdentify,
])
