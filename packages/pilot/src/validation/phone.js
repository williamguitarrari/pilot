const phone = /^\([1-9]{2}\)\s\d{4,5}-\d{3,4}[_]?$/

export default message => value =>
  !phone.test(value) && message
