import React from 'react'
import {
  path,
  pick,
  pipe,
  prop,
} from 'ramda'

import { Truncate } from 'former-kit'

import formatCurrency from '../../formatters/currency'
import formatDate from '../../formatters/longDate'
import formatPaymentMethod from '../../formatters/paymentMethod'
import renderStatusLegend from './renderStatusLegend'

const convertPaymentValue = property => pipe(
  path(['payment', property]),
  formatCurrency
)

const applyTruncateCustomerName = (item) => {
  const value = path(['customer', 'name'], item)

  return value
    ? (
      <Truncate
        text={value}
      />
    )
    : null
}

const getDefaultColumns = ({ t }) => ([
  {
    accessor: ['status'],
    orderable: true,
    renderer: renderStatusLegend(t),
    title: t('models.transaction.status'),
  },
  {
    accessor: ['created_at'],
    orderable: true,
    renderer: pipe(prop('created_at'), formatDate),
    title: t('models.transaction.created_date'),
  },
  {
    accessor: ['id'],
    orderable: true,
    title: t('models.transaction.id'),
  },
  {
    accessor: ['customer', 'name'],
    orderable: true,
    renderer: applyTruncateCustomerName,
    title: t('models.transaction.customer_name'),
  },
  {
    accessor: ['payment', 'method'],
    orderable: true,
    renderer: pipe(
      prop('payment'),
      pick(['method', 'international']),
      formatPaymentMethod,
      t
    ),
    title: t('models.transaction.payment_method'),
  },
  {
    accessor: ['authorized_amount'],
    align: 'end',
    orderable: true,
    renderer: convertPaymentValue('authorized_amount'),
    title: t('models.transaction.transaction_amount'),
  },
])

export default getDefaultColumns
