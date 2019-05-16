const createMockPromise = result => () => Promise.resolve(result)

const findBalance = createMockPromise({
  available: {
    amount: 29490,
  },
})

const findRecipient = createMockPromise({
  id: 're_123',
})

const getCurrentCompany = createMockPromise({
  default_recipient_id: {
    test: 're_123',
  },
})

const getTransferLimits = createMockPromise({
  minimum: 100,
  maximum: 1000,
})

export default {
  balance: {
    find: findBalance,
  },
  company: {
    current: getCurrentCompany,
  },
  recipients: {
    find: findRecipient,
  },
  transfers: {
    limits: getTransferLimits,
  },
}
