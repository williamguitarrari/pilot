import moment from 'moment'

const rows = [
  {
    date_created: moment().format('L'),
    name: 'Caderno do Saitama',
    paid_amount: 5000,
    status: 'available',
    url: 'https://link.pagar.me/tSkopcg0b1',
  },
  {
    date_created: moment().format('L'),
    name: 'Caderno do Goku',
    paid_amount: 4000,
    status: 'paid',
    url: 'https://link.pagar.me/tSkopcg0b2',
  },
  {
    date_created: moment().format('L'),
    name: 'Caderno do Askeladd',
    paid_amount: 3000,
    status: 'inactive',
    url: 'https://link.pagar.me/tSkopcg0b3',
  },
]

export default rows
