const validateAnticipationDays = message => (value) => {
  let parsed
  try {
    parsed = JSON.parse(`[${value}]`)
  } catch (error) {
    return message
  }

  const someInvalid = parsed.some((stringNumber) => {
    const number = Number(stringNumber)

    if (Number.isNaN(number)) {
      return true
    }

    return number < 1 || number > 31
  })

  return someInvalid && message
}

export default validateAnticipationDays
