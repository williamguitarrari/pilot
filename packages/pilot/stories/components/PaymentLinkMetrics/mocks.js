const totalAmountByWeekday = [
  {
    label: 'DOM',
    value: 1500,
  },
  {
    label: 'SEG',
    value: 5000,
  },
  {
    label: 'TER',
    value: 3000,
  },
  {
    label: 'QUA',
    value: 3500,
  },
  {
    label: 'QUI',
    value: 2800,
  },
  {
    label: 'SEX',
    value: 4800,
  },
  {
    label: 'SÁB',
    value: 3600,
  },
]

const presets = [
  {
    date: () => null,
    key: 'custom',
    label: 'Personalizado',
  },
  {
    date: () => 0,
    key: 'today',
    label: 'Hoje',
  },
  {
    date: () => -7,
    key: '7-days',
    label: '7 Dias',
  },
  {
    date: () => -15,
    key: '15-days',
    label: '15 Dias',
  },
  {
    date: () => -30,
    key: '30-days',
    label: '30 Dias',
  },
]

export {
  presets,
  totalAmountByWeekday,
}
