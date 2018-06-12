const updatePassword = client => data => (
  client
    .user
    .updatePassword(data)
)

export default updatePassword
