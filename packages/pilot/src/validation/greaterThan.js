const greaterThan = (limit, message) => value => (
  (parseInt(value, 10) > limit) && message
)

export default greaterThan
