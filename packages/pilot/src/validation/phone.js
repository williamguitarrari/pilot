const isPhone = /^\([1-9]{2}\)\s([9][0-9]{4}-[0-9]{4}|[2-9][0-9]{4}-[0-9]{3}_)$/

export default message => value => !isPhone.test(value) && message
