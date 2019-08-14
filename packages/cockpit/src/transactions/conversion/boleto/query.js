const query = ({ end, start }) => ({
  query: {
    range: {
      date_created: {
        lte: end,
        gte: start,
      },
    },
  },
  aggs: {
    boleto: {
      filter: {
        term: {
          payment_method: 'boleto',
        },
      },
      aggs: {
        paid: {
          filter: {
            term: {
              status: 'paid',
            },
          },
        },
      },
    },
  },
})

export default query
