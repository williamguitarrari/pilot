import { getErrorMessage, getErrorName } from './error'

const getReactError = (error, affectedRoutes) => {
  if (error) {
    return {
      affectedRoutes,
      message: getErrorMessage(error),
      name: getErrorName(error),
      source: 'react',
    }
  }

  return null
}

export default getReactError
