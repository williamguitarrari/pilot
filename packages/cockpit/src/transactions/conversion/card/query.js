const query = ({ end, start }) => ({
  query: {
    bool: {
      must: [
        {
          range: {
            date_created: {
              lte: end,
              gte: start,
            },
          },
        },
      ],
      must_not: [{
        term: {
          payment_method: 'boleto',
        },
      }],
      should: [
        {
          term: {
            status: 'paid',
          },
        },
        {
          term: {
            status: 'authorized',
          },
        },
        {
          term: {
            status: 'refunded',
          },
        },
        {
          term: {
            status: 'chargedback',
          },
        },
        {
          term: {
            status: 'refused',
          },
        },
      ],
    },
  },
  aggs: {
    conversion: {
      scripted_metric: {
        init_script: 'real-conversion-init',
        map_script: 'real-conversion-mapv2',
        combine_script: 'real-conversion-combinev2',
        reduce_script: 'real-conversion-reducev2',
      },
    },
    paid: {
      filter: {
        term: {
          status: 'paid',
        },
      },
    },
  },
})

export default query
