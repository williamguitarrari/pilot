const { NODE_ENV, REACT_APP_API_ENVIRONMENT } = process.env

const environment =
  (NODE_ENV === 'production' || REACT_APP_API_ENVIRONMENT === 'live')
    ? 'live'
    : 'test'

export default environment
