const getBalance = client => recipientId => (
  client
    .balance
    .find({ recipientId })
)


export default getBalance
