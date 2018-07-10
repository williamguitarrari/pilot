const lessThan = (limit, message) =>
  value =>
    (parseInt(value, 10) < limit) && message

export default lessThan
