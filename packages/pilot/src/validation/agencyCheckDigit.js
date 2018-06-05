const checkDigit = /^[\dx]?$/i
export default message => value => !checkDigit.test(value) && message
