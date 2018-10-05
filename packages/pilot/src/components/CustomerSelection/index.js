import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  CardActions,
  CardContent,
  Spacing,
  Table,
} from 'former-kit'
import { pipe, prop } from 'ramda'
import IconCheck from 'emblematic-icons/svg/Check32.svg'

import formatCpf from '../../formatters/cpfCnpj'
import formatPhone from '../../formatters/phone'

const getColumns = (selected, onSelect, t) => [
  {
    accessor: ['name'],
    orderable: false,
    title: t('add_transaction_customer_name'),
  },
  {
    accessor: ['document'],
    orderable: false,
    renderer: pipe(prop('document'), formatCpf),
    title: t('add_transaction_customer_document'),
  },
  {
    accessor: ['email'],
    orderable: false,
    title: t('add_transaction_customer_email'),
  },
  {
    accessor: ['phone'],
    orderable: false,
    renderer: pipe(prop('phone'), formatPhone),
    title: t('add_transaction_customer_phone'),
  },
  {
    align: 'center',
    isAction: true,
    renderer: (item) => {
      if (selected && item.id === selected.id) {
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
          onClick={() => onSelect(item)}
          size="tiny"
        >
          {t('select')}
        </Button>
      )
    },
    title: '',
  },
]

const CustomerSelection = ({
  actionDisabled,
  customers,
  onCancel,
  onSelect,
  onSubmit,
  selected,
  t,
}) => (
  <Fragment>
    <CardContent>
      <Table
        columns={getColumns(selected, onSelect, t)}
        rows={customers}
      />
    </CardContent>
    <CardActions>
      <Button
        fill="outline"
        onClick={onCancel}
        relevance="low"
      >
        {t('cancel')}
      </Button>
      <Spacing />
      <Button
        disabled={actionDisabled}
        fill="gradient"
        onClick={onSubmit}
      >
        {t('confirm')}
      </Button>
    </CardActions>
  </Fragment>
)
const customerShape = PropTypes.shape({
  document: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
})

CustomerSelection.propTypes = {
  actionDisabled: PropTypes.bool.isRequired,
  customers: PropTypes.arrayOf(customerShape.isRequired).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selected: customerShape,
  t: PropTypes.func.isRequired,
}

CustomerSelection.defaultProps = {
  selected: null,
}

export default CustomerSelection
