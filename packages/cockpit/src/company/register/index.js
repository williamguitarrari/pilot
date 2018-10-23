import fetch from 'isomorphic-fetch'
import { apiUrl } from '../../environment'
import buildCompanyParameters from './buildParameters'

const registerCompany = (registerData) => {
  const body = JSON.stringify(buildCompanyParameters(registerData))
  return fetch(`${apiUrl}companies`, {
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
}
export default registerCompany

