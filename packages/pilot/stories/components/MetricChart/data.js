import React from 'react'
import {
  Flexbox,
  Tooltip,
} from 'former-kit'
import IconInfo from 'emblematic-icons/svg/Info32.svg'

const transactionsByStatus = [
  {
    color: '#17c9b2',
    label: 'Aprovadas',
    value: 1150,
  },
  {
    color: '#0b6e69',
    label: 'Aguardando pgto',
    value: 240,
  },
  {
    color: '#613fc7',
    label: 'Estornadas',
    value: 200,
  },
  {
    color: '#da272c',
    label: 'Recusadas',
    value: 100,
  },
  {
    color: '#070606',
    label: 'Outros',
    legendRenderer: label => (
      <Flexbox alignItems="center">
        <span style={{ marginRight: '5px' }}>{label}</span>
        <Tooltip
          content={
            <span>Chargeback: 1</span>
          }
          placement="rightMiddle"
        >
          <IconInfo width={16} height={16} />
        </Tooltip>
      </Flexbox>
    ),
    value: 10,
  },
]

const transactionsByInstallment = [
  {
    label: '1',
    value: 23,
  },
  {
    label: '3',
    value: 35,
  },
  {
    label: '6',
    value: 38,
  },
  {
    label: '8',
    value: 27,
  },
  {
    label: '12',
    value: 15,
  },
]

const percentageConversion = [
  {
    label: 'Real',
    value: 70,
  },
  {
    label: 'Sem retentativas',
    value: 100,
  },
  {
    label: 'Boletos',
    value: 50,
  },
]

export {
  percentageConversion,
  transactionsByInstallment,
  transactionsByStatus,
}
