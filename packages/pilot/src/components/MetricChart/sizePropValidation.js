const isPercentageOrNumber = (props, propName, componentName) => {
  const prop = props[propName]

  const isString = typeof prop === 'string'
  const isNumber = typeof prop === 'number'

  const validationError = message => new Error(
    `Invalid prop '${propName}' supplied to '${componentName}'. ${message}`
  )

  if (!isString && !isNumber && propName !== 'width') {
    return validationError('Expected a percentage string or number.')
  }

  const isPercentage = /\d%/
  if (isString && !isPercentage.test(prop)) {
    return validationError('Expected string to be a percentage value.')
  }

  return undefined
}

export default isPercentageOrNumber
