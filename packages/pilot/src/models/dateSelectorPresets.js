export default [
  {
    date: () => 0,
    key: 'today',
    label: 'Hoje',
    mode: 'single',
  },
  {
    key: 'last',
    label: 'Últimos:',
    list: [
      {
        date: () => -7,
        key: 'last-7',
        label: '7 dias',
        mode: 'period',
      },
      {
        date: () => -15,
        key: 'last-15',
        label: '15 dias',
        mode: 'period',
      },
      {
        date: () => -30,
        key: 'last-30',
        label: '30 dias',
        mode: 'period',
      },
      {
        date: () => -60,
        key: 'last-60',
        label: '60 dias',
        mode: 'period',
      },
    ],
  },
  {
    key: 'custom',
    label: 'Customizado:',
    list: [
      {
        date: () => null,
        key: 'single',
        label: 'Dia',
        mode: 'single',
      },
      {
        date: () => null,
        key: 'period',
        label: 'Período',
        mode: 'period',
      },
    ],
    title: 'Últimos:',
  },
]
