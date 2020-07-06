import React from 'react'
import {
  pipe,
  prop,
} from 'ramda'

import formatCurrency from '../../../../formatters/currency'
import formatDate from '../../../../formatters/longDate'
import LinkCopyURL from '../../LinkCopyURL'
import StatusLegend from '../../StatusLegend'

const renderTotalPaid = (item) => {
  const { amount, orders_paid: ordersPaid } = item

  return (
    <div>
      { formatCurrency(amount * ordersPaid) }
    </div>
  )
}

const getDefaultColumns = ({ t }) => ([
  {
    accessor: ['status'],
    orderable: true,
    renderer: item => <StatusLegend t={t} status={item.status} />,
    title: t('pages.payment_links.list.status'),
    width: 100,
  },
  {
    accessor: ['name'],
    orderable: true,
    title: t('pages.payment_links.list.link_name'),
  },
  {
    accessor: ['date_created'],
    orderable: true,
    renderer: pipe(prop('date_created'), formatDate),
    title: t('pages.payment_links.list.created_at'),
  },
  {
    accessor: ['url'],
    orderable: true,
    renderer: item => <LinkCopyURL t={t} status={item.status} url={item.url} />,
    title: t('pages.payment_links.list.link'),
    width: 300,
  },
  {
    orderable: false,
    renderer: renderTotalPaid,
    title: t('pages.payment_links.list.total_paid'),
  },
])

export default getDefaultColumns
