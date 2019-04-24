import client from './mocks/client'
import withdraw from '.'

const expectedMock = {
  balance: {
    available: {
      amount: 29490,
    },
  },
  id: 're_123',
  limits: {
    minimum: 100,
    maximum: 1000,
  },
}

describe('Withdraw', () => {
  describe('should return a object with balance, id and limits', () => {
    const bindedWithdraw = withdraw(client)
    it('when a recipient id is received', () => {
      bindedWithdraw('re_123')
        .then((receivedWithdraw) => {
          expect(receivedWithdraw).toEqual(expectedMock)
        })
    })

    it('when a recipient id is not received', () => {
      bindedWithdraw()
        .then((receivedWithdraw) => {
          expect(receivedWithdraw).toEqual(expectedMock)
        })
    })
  })
})
