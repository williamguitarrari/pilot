const checkDigit = /^\d{1,2}$|^x$/i
export default message => value => !checkDigit.test(value) && message
