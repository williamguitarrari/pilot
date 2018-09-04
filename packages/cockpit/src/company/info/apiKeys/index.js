import {
  applySpec,
  pathOr,
} from 'ramda'
import environment from '../../../environment'

const getKeyByPath = path => env => pathOr('', [path, env])

const getApiKey = getKeyByPath('api_key')

const encryptionKey = getKeyByPath('encryption_key')

const getApiKeys = env => applySpec({
  apiKey: getApiKey(env),
  encryptionKey: encryptionKey(env),
})

const createApiKey = company => ({
  title: environment,
  keys: getApiKeys(environment)(company),
})

export default createApiKey
