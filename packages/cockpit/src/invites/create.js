const createInvite = client => data => (
  client
    .invites
    .create(data)
)

export default createInvite
