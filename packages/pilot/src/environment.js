import { defaultTo } from 'ramda'

const {
  REACT_APP_API_ENVIRONMENT,
  REACT_APP_LIVE_URL,
  REACT_APP_RECAPTCHA_KEY,
  REACT_APP_TEST_URL,
} = process.env

const getLiveUrl = defaultTo('https://beta.dashboard.stg.pagarme.net/latest/index.html')
const getTestUrl = defaultTo('https://beta.dashboard.sandbox.stg.pagarme.net/latest/index.html')
const getRecaptchaKey = defaultTo('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI')

const env = REACT_APP_API_ENVIRONMENT === 'live'
  ? 'live'
  : 'test'
const liveUrl = getLiveUrl(REACT_APP_LIVE_URL)
const testUrl = getTestUrl(REACT_APP_TEST_URL)
const recaptchaKey = getRecaptchaKey(REACT_APP_RECAPTCHA_KEY)

export {
  liveUrl,
  testUrl,
  recaptchaKey,
}

export default env
