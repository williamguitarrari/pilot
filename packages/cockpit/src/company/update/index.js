const updateCompany = client => data => (
  client
    .company
    .update(data)
)

export default updateCompany
