const buildParamErrors = (error) => {
  if (!error || !error.response) {
    return null
  }

  return error.response.errors.map(item => ({
    code: item.message,
    message: item.message,
    parameter_name: item.parameter_name,
  }))
}

export default buildParamErrors
