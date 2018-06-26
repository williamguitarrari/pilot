const deleteUser = client => id => (
  client
    .user
    .destroy({ id })
)

export default deleteUser
