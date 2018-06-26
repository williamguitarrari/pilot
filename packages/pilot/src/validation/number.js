const onlyNumbers = /^\d+$/
export default message => value => !onlyNumbers.test(value) && message
