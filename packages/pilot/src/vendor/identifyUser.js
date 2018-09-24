import { juxt } from 'ramda'
import { identify as appcuesIdentify } from './appcues'
import { identify as gtmIdentify } from './googleTagManager'
import { identify as fullStoryIdentify } from './fullStory'

/**
 * Identify User in vendor SDK integrations
 *
 * @param {number} id user id
 * @param {string} email user email
  */
export default juxt([
  appcuesIdentify,
  gtmIdentify,
  fullStoryIdentify,
])
