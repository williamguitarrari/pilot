import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Table,
} from 'former-kit'

import IconCheck from 'emblematic-icons/svg/Check32.svg'

const getColumns = (selectedAccountId, onSelect, t) => [
  {
    accessor: ['legal_name'],
    orderable: false,
    title: t('pages.settings.company.card.register.bank.account_name'),
  },
  {
    accessor: ['bank_code'],
    orderable: false,
    renderer: item => t(`models.bank_code.${item.bank_code}`),
    title: t('pages.settings.company.card.register.bank.name'),
  },
  {
    accessor: ['agencia'],
    align: 'end',
    orderable: false,
    renderer: item => `${item.agencia}-${item.agencia_dv}`,
    title: t('pages.settings.company.card.register.bank.agency'),
  },
  {
    accessor: ['conta'],
    align: 'end',
    orderable: false,
    renderer: item => `${item.conta}-${item.conta_dv}`,
    title: t('pages.settings.company.card.register.bank.account'),
  },
  {
    accessor: ['type'],
    orderable: false,
    title: t('pages.settings.company.card.register.bank.account_type'),
  },
  {
    align: 'center',
    isAction: true,
    renderer: (item) => {
      if (item.id === selectedAccountId) {
        return (
          <IconCheck
            color="#37cc9a"
            height={16}
            width={16}
          />
        )
      }

      return (
        <Button
          fill="outline"
          onClick={() => onSelect(item.id)}
          size="tiny"
        >
          {t('bank_account_select')}
        </Button>
      )
    },
    title: '',
  },
]

const BankAccountSelector = ({
  accounts,
  onSelect,
  selectedAccountId,
  t,
}) => (
  <Table
    columns={getColumns(selectedAccountId, onSelect, t)}
    rows={accounts}
  />
)

BankAccountSelector.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      agencia_dv: PropTypes.string.isRequired,
      agencia: PropTypes.string.isRequired,
      bank_code: PropTypes.string.isRequired,
      conta_dv: PropTypes.string.isRequired,
      conta: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      legal_name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedAccountId: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
}

export default BankAccountSelector
