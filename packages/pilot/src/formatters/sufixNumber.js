const getSufix = (exponential) => {
  switch (exponential) {
    case 1:
      return 'mil'
    case 2:
      return 'mi'
    case 3:
      return 'bi'
    case 4:
      return 'tri'

    default:
      return ''
  }
}

const fixNumber = (number) => {
  if (!number || (number % 1 === 0)) {
    return `${number}`
  }

  return number.toFixed(1)
}

const addSufix = (number) => {
  const divisor = 1000

  if (!number || number < divisor) {
    return `${number}`
  }

  let outValue = number
  let exponential = 0

  while (outValue >= divisor) {
    outValue /= divisor

    exponential += 1
  }

  return `${fixNumber(outValue)} ${getSufix(exponential)}`
}

export default addSufix
