const transactionsQuery = ({ from, to }) => ({
  query: {
    filtered: {
      filter: {
        and: [
          {
            term: {
              payment_method: 'credit_card',
            },
          },
          {
            term: {
              acquirer_name: 'pagarme',
            },
          },
          {
            terms: {
              status: [
                'paid',
                'refunded',
                'chargedback',
              ],
            },
          },
          {
            range: {
              date_created: {
                gte: from,
                lte: to,
              },
            },
          },
        ],
      },
    },
  },
})

const chargebackQuery = ({ from, to }) => ({
  query: {
    filtered: {
      filter: {
        and: [
          {
            term: {
              type: 'chargeback',
            },
          },
          {
            term: {
              cycle: 1,
            },
          },
          {
            term: {
              installment: 1,
            },
          },
          {
            range: {
              accrual_date: {
                gte: from,
                lte: to,
              },
            },
          },
        ],
      },
    },
  },
})

export {
  chargebackQuery,
  transactionsQuery,
}
