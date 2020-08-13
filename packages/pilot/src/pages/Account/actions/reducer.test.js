import { selectCompanyFees } from './reducer'

/* eslint-disable sort-keys */
const companyFactory = mdrs => ({
  pricing: {
    gateway: {
      test: {
        transaction_cost: {
          credit_card: 50,
          debit_card: 50,
          boleto: 0,
        },
        transaction_spread: {
          credit_card: 0,
          debit_card: 1.5,
          boleto: 0,
        },
        minimum_monthly_payment: 0,
        antifraud_cost: [
          {
            name: 'pagarme',
            cost: 70,
          },
        ],
        boletos: {
          payment_fixed_fee: 380,
          payment_spread_fee: 0,
        },
      },
    },
    psp: {
      test: {
        anticipation: 3.14,
        mdrs,
      },
    },
    transfers: {
      credito_em_conta: 0,
      ted: 367,
      doc: 367,
      inter_recipient: 0,
    },
  },
})
/* eslint-enable sort-keys */

describe('Account Reducer', () => {
  describe('selectCompanyFees', () => {
    describe('when company has 1, 2 and 7 installments', () => {
      const company = companyFactory([{
        installments: [
          { installment: 1, mdr: 3.79 },
          { installment: 2, mdr: 4.19 },
          { installment: 7, mdr: 4.59 },
        ],
        payment_method: 'credit_card',
      }])

      const fees = selectCompanyFees(company)

      it('should return the correct response', () => {
        expect(fees).toMatchSnapshot()
      })
    })

    describe('when company has 1 installments', () => {
      const company = companyFactory([{
        installments: [{ installment: 1, mdr: 3.79 }],
        payment_method: 'credit_card',
      }])

      const fees = selectCompanyFees(company)

      it('should return the correct response', () => {
        expect(fees).toMatchSnapshot()
      })
    })

    describe('when company has 1, 2 and 7 installments and payment_method is null', () => {
      const company = companyFactory([
        {
          installments: [],
          payment_method: 'debit_card',
        }, {
          installments: [
            { installment: 1, mdr: 3.79 },
            { installment: 2, mdr: 4.19 },
            { installment: 7, mdr: 4.59 },
          ],
          payment_method: null,
        }])

      const fees = selectCompanyFees(company)

      it('should return the correct response', () => {
        expect(fees).toMatchSnapshot()
      })
    })

    describe('when company has other installments types', () => {
      const company = companyFactory([{
        installments: [
          { installment: 1, mdr: 3.79 },
          { installment: 4, mdr: 4.19 },
          { installment: 8, mdr: 4.59 },
        ],
        payment_method: 'credit_card',
      }])

      const fees = selectCompanyFees(company)

      it('should return the correct response', () => {
        expect(fees).toMatchSnapshot()
      })
    })
  })
})

