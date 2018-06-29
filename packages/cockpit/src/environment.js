const { REACT_APP_API_ENVIRONMENT } = process.env

const env = REACT_APP_API_ENVIRONMENT === 'live' ? 'live' : 'test'

export default env
