import React from 'react'
import {
  path,
  pipe,
  prop,
} from 'ramda'

import { Truncate } from 'former-kit'

import formatCurrency from '../../../../formatters/currency'
import formatDate from '../../../../formatters/longDate'
import rendererStatusLegend from '../../../TransactionsList/renderStatusLegend'

const convertPaymentValue = property => pipe(
  path([property]),
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

const getDocumentNumber = (item) => {
  const customerDocuments = item.customer.documents

  if (!customerDocuments) {
    return false
  }

  const document = customerDocuments.find(v => v.number)

  if (!document) {
    return false
  }

  return document.number
}

const renderPaymentMethod = t => item => t(`models.transaction.${item.payment_method}`)

const getDefaultColumns = t => ([
  {
    accessor: ['status'],
    renderer: rendererStatusLegend(t),
    title: t('models.transaction.status'),
  },
  {
    accessor: ['id'],
    title: t('models.transaction.id'),
  },
  {
    accessor: ['created_at'],
    renderer: pipe(prop('created_at'), formatDate),
    title: 'Data de criação',
  },
  {
    accessor: ['customer', 'name'],
    renderer: applyTruncateCustomerName,
    title: t('models.transaction.customer_name'),
  },
  {
    accessor: ['customer', 'document_number'],
    renderer: getDocumentNumber,
    title: t('models.transaction.document'),
  },
  {
    accessor: ['payment_method'],
    renderer: renderPaymentMethod(t),
    title: t('models.transaction.payment_method'),
  },
  {
    accessor: ['authorized_amount'],
    renderer: convertPaymentValue('authorized_amount'),
    title: t('models.transaction.transaction_amount'),
  },
])

export default getDefaultColumns
