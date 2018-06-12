import {
  applySpec,
  juxt,
  pathOr,
} from 'ramda'

const getKeyByPath = path => env => pathOr('', [path, env])

const getApiKey = getKeyByPath('api_key')

const encryptionKey = getKeyByPath('encryption_key')

const getApiKeys = env => applySpec({
  apiKey: getApiKey(env),
  encryptionKey: encryptionKey(env),
})

const createApiKey = ({ title, env }) => company => ({
  title,
  keys: getApiKeys(env)(company),
})

const apiKeysArray = [
  createApiKey({
    title: 'live',
    env: 'live',
  }),
  createApiKey({
    title: 'test',
    env: 'test',
  }),
]

export default juxt(apiKeysArray)
