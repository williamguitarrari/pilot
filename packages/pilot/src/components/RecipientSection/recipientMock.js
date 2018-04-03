import moment from 'moment'

const recipient = {
  amount: 4000000123, // SplitRule
  installments: [
    {
      amount: 400000000,
      number: '1/4',
      status: 'waiting_payment',
      payment_date: moment('2018-1-1'),
      original_payment_date: moment('2018-2-1'),
      net_amount: 100000000,
      costs: {
        mdr: 100000000,
        anticipation: 100000000,
        chargeback: 100000000,
        refund: 100000000,
      },
    },
    {
      amount: 400000000,
      number: '2/4',
      status: 'waiting_payment',
      payment_date: null,
      original_payment_date: moment('2018-3-1'),
      net_amount: 500,
      costs: {
        mdr: 150,
        anticipation: 0,
        chargeback: 20,
        refund: 0,
      },
    },
    {
      amount: 400000000,
      number: '3/4',
      status: 'waiting_payment',
      payment_date: null,
      original_payment_date: moment('2018-4-1'),
      net_amount: 500,
      costs: {
        mdr: 150,
        anticipation: 0,
        chargeback: 20,
        refund: 0,
      },
    },
    {
      amount: 400000000,
      number: '4/4',
      status: 'waiting_payment',
      payment_date: null,
      original_payment_date: moment('2018-5-1'),
      net_amount: 500,
      costs: {
        mdr: 150,
        anticipation: 0,
        chargeback: 20,
        refund: 0,
      },
    },
  ],
  liabilities: ['MDR', 'Chargeback'], // SplitRules { mdr: charge_processing_fee, chargeback: liable }
  name: 'Loja da Maria', // SplitRules -> Recipients -> BankAccounts
  net_amount: 100000000, // SplitRule -> Payable
  status: 'chargedback',
}

export default recipient
