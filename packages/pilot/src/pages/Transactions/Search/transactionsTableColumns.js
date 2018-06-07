import React from 'react'
import {
  head,
  isNil,
  path,
  pick,
  pipe,
  prop,
  unless,
} from 'ramda'
import { Button } from 'former-kit'
import formatCpfCnpj from '../../../formatters/cpfCnpj'
import formatCurrency from '../../../formatters/currency'
import formatDate from '../../../formatters/longDate'
import formatPaymentMethod from '../../../formatters/paymentMethod'
import formatRefuseReason from '../../../formatters/refuseReason'
import renderCardBrand from '../../../containers/TransactionsList/renderCardBrand'
import renderStatusLegend from '../../../containers/TransactionsList/renderStatusLegend'

const convertPaymentValue = property => pipe(
  path(['payment', property]),
  formatCurrency
)

const getDefaultColumns = detailsClick => ([
  {
    title: 'transaction.status',
    renderer: renderStatusLegend,
    accessor: ['status'],
    orderable: true,
  },
  { title: 'transaction.id', accessor: ['id'], orderable: true },
  {
    title: 'transaction.created_date',
    accessor: ['created_at'],
    orderable: true,
    renderer: pipe(prop('created_at'), formatDate),
  },
  {
    title: 'transaction.document',
    accessor: ['customer', 'documents'],
    renderer: pipe(
      path(['customer', 'documents']),
      unless(
        isNil,
        pipe(
          head,
          formatCpfCnpj
        )
      )
    ),
  },
  {
    title: 'transaction.payment_method',
    accessor: ['payment', 'method'],
    orderable: true,
    renderer: pipe(
      prop('payment'),
      pick(['method', 'international']),
      formatPaymentMethod
    ),
  },
  {
    title: 'transaction.paid_amount',
    accessor: ['payment', 'paid_amount'],
    orderable: true,
    renderer: convertPaymentValue('paid_amount'),
  },
  // {
  //   title: 'Cost',
  //   accessor: ['payment', 'cost_amount'],
  //   orderable: true,
  //   renderer: convertPaymentValue('cost_amount'),
  // },
  // {
  //   title: 'Net amount',
  //   accessor: ['payment', 'net_amount'],
  //   renderer: convertPaymentValue('net_amount'),
  // },
  { title: 'transaction.email', accessor: ['customer', 'email'], orderable: true },
  {
    title: 'transaction.refuse_reason',
    accessor: ['refuse_reason'],
    orderable: true,
    renderer: pipe(
      prop('refuse_reason'),
      formatRefuseReason
    ),
  },
  // { title: 'Antifraud', accessor: ['antifraud', 'recommendation'], orderable: true },
  { title: 'transaction.installments', accessor: ['payment', 'installments'], orderable: true },
  { title: 'transaction.customer_name', accessor: ['customer', 'name'], orderable: true },
  {
    title: 'transaction.card_brand',
    accessor: ['card', 'brand_name'],
    orderable: true,
    renderer: renderCardBrand,
  },
  { title: 'transaction.boleto_url', accessor: ['boleto', 'url'], orderable: true },
  {
    align: 'center',
    isAction: true,
    orderable: false,
    renderer: index => (
      <Button
        fill="outline"
        onClick={() => detailsClick(index)}
      >
        VER DETALHES
      </Button>
    ),
    title: 'transaction.details',
    aggregator: null,
    aggregationRenderer: null,
    aggregationTitle: null,
  },
])

export default getDefaultColumns
