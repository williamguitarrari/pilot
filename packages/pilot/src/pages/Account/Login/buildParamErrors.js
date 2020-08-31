const buildParamErrors = (error) => {
  if (!error?.response) {
    return null
  }

  return error.response.errors.map(item => ({
    code: item.code,
    message: item.message,
    parameter_name: item.parameter_name,
  }))
}

export default buildParamErrors
