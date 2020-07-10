/* eslint-disable no-undef */
import hasProperty from './hasProperty'

/**
 * send data to google tag manager
 * @param {Object} data to be sent to google tag maanager
 */
const pushData = (data) => {
  if (hasProperty(window.dataLayer)) {
    window.dataLayer.push(data)
  }
}

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
) => pushData({
  email,
  environment,
  event: 'loginReceive',
  fullstoryUserId: id,
  userDateCreated,
  userId: id,
  userName,
  userPermission,
})

/**
 * Set Company identification variables on accountReceive
 * in google tag manager data layer
 * @param {string} companyId company id
 * @param {string} companyName company name
 * @param {string} companyDateCreated company created date
 * @param {string} companyStatus company status
 */
export const setCompany = (
  companyId,
  companyName,
  companyDateCreated,
  companyStatus
) => pushData({
  companyDateCreated,
  companyId,
  companyName,
  companyStatus,
  event: 'accountReceive',
})

/**
 * Triggers inactiveCompanyLogin event
 */
export const inactiveCompanyLogin = () => pushData({
  event: 'inactiveCompanyLogin',
})

/**
 * Trigger activeCompanyLogin event
 */
export const activeCompanyLogin = () => pushData({
  event: 'activeCompanyLogin',
})

/**
 * Trigger paymentLinkCompanyLogin event
 */
export const paymentLinkCompanyLogin = () => pushData({
  event: 'paymentLinkCompanyLogin',
})

/**
 * trigger page view in google tag manager
 * @param {Object} page
 * @param {string} page.path the page path
 * @param {title} page.title the page title
 */
export const virtualPageView = ({ path, title }) => pushData({
  event: 'virtualPageView',
  pagePath: path,
  pageTitle: title,
})
