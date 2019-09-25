import React from 'react'
import {
  always,
  applySpec,
  either,
  head,
  ifElse,
  isEmpty,
  isNil,
  path,
  pick,
  pipe,
  prop,
} from 'ramda'

import {
  Button,
  Truncate,
} from 'former-kit'

import formatCpfCnpj from '../../formatters/cpfCnpj'
import formatCurrency from '../../formatters/currency'
import formatDate from '../../formatters/longDate'
import formatPaymentMethod from '../../formatters/paymentMethod'
import formatRefuseReason from '../../formatters/refuseReason'
import renderCardBrand from './renderCardBrand'
import renderStatusLegend from './renderStatusLegend'

const convertPaymentValue = property => pipe(
  path(['payment', property]),
  formatCurrency
)

const formatDocument = applySpec({
  number: pipe(
    prop('number'),
    formatCpfCnpj
  ),
  type: prop('type'),
})

const getDefaultDocumentNumber = pipe(
  prop('documents'),
  ifElse(
    either(isNil, isEmpty),
    always(null),
    pipe(
      head,
      formatDocument,
      prop('number'),
      formatCpfCnpj
    )
  )
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

const getDefaultColumns = ({ onDetailsClick, t }) => ([
  {
    accessor: ['status'],
    orderable: true,
    renderer: renderStatusLegend,
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
  {
    accessor: ['customer', 'document_number'],
    renderer: pipe(
      prop('customer'),
      getDefaultDocumentNumber
    ),
    title: t('models.transaction.document'),
  },
  {
    accessor: ['refuse_reason'],
    orderable: true,
    renderer: pipe(
      prop('refuse_reason'),
      formatRefuseReason
    ),
    title: t('models.transaction.refuse_reason'),
  },
  {
    accessor: ['payment', 'installments'],
    orderable: true,
    title: t('models.transaction.installments'),
  },
  {
    accessor: ['customer', 'email'],
    title: t('email'),
  },
  {
    accessor: ['card', 'brand_name'],
    orderable: true,
    renderer: renderCardBrand,
    title: t('models.transaction.card_brand'),
  },
  {
    accessor: ['boleto', 'url'],
    orderable: true,
    title: t('models.transaction.boleto_url'),
  },
  {
    aggregationRenderer: null,
    aggregationTitle: null,
    aggregator: null,
    align: 'center',
    isAction: true,
    orderable: false,
    renderer: index => (
      <Button
        fill="outline"
        onClick={() => onDetailsClick(index)}
      >
        {t('pages.transaction.view_details')}
      </Button>
    ),
    title: t('models.transaction.details'),
  },
])

export default getDefaultColumns
