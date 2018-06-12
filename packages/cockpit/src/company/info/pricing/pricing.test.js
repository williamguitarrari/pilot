import companyMock from '../../companyMock.json'
import pricing from './pricing'

const mock = [
  {
    mainTitle: 'gateway',
    subItems: [
      { prices: [{ unit: 'real', value: 380 }, { unit: 'percentage', value: 0 }], title: 'boleto' },
      { prices: [{ unit: 'real', value: 50 }, { unit: 'percentage', value: 0 }], title: 'credit_card' },
      { prices: [{ unit: 'real', value: 50 }, { unit: 'percentage', value: 1.5 }], title: 'debit_card' },
      { prices: [{ unit: 'real', value: 70 }], title: 'antifraud_cost' },
      { prices: [{ unit: 'real', value: 0 }], title: 'minimum_monthly_payment' },
    ],
  },
  { mainTitle: 'psp', subItems: [{ prices: [{ unit: 'percentage', value: 3.14 }], title: 'anticipation' }] },
  {
    mainTitle: 'transfers',
    subItems: [
      { prices: [{ unit: 'real', value: 0 }], title: 'credito_em_conta' },
      { prices: [{ unit: 'real', value: 367 }], title: 'ted' },
      { prices: [{ unit: 'real', value: 367 }], title: 'doc' }],
  },
]

describe('Company pricing details to dashboard', () => {
  it('should get formated pricing when receives company object', () => {
    const result = pricing(companyMock)

    expect(result).toEqual(mock)
  })
})
