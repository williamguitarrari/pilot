import React from 'react'
import Summary from '../../../../src/containers/Withdraw/Summary'

const SummaryExample = () => (
  <Summary
    unit="R$"
    colors={{
      amount: '#37cc9a',
      requested: '#37cc9a',
      transferCost: '#ff796f',
    }}
    labels={{
      amount: 'VALOR A SER TRANSFERIDO',
      date: 'DATA DE SAÍDA',
      requested: 'VALOR SOLICITADO',
      transferCost: 'CUSTO DA TRANSFERÊNCIA',
    }}
    contents={{
      amount: 9995000,
      date: '20/03/2018',
      requested: 10000000,
      transferCost: 3.67,
    }}
  />
)
export default SummaryExample
