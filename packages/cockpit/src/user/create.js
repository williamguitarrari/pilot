const createUser = client => data => (
  client
    .user
    .create(data)
)

export default createUser
