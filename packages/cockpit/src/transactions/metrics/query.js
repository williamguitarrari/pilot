const query = ({ end, start }) => ({
  filter: {
    range: {
      date_created: {
        lte: end,
        gte: start,
      },
    },
  },
  aggs: {
    metrics: {
      date_range: {
        field: 'date_created',
        ranges: [
          {
            from: start,
            to: end,
          },
        ],
      },
      aggs: {
        volume: {
          sum: {
            field: 'amount',
          },
        },
        payment_method: {
          terms: {
            field: 'payment_method',
          },
        },
        card_brand: {
          terms: {
            field: 'card_brand',
          },
        },
        status: {
          terms: {
            field: 'status',
          },
        },
        refuse_reason: {
          terms: {
            field: 'refuse_reason',
          },
        },
        installments: {
          terms: {
            field: 'installments',
          },
        },
      },
    },
  },
})

export default query
