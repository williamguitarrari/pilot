import React from 'react'
import {
  pipe,
  prop,
} from 'ramda'
import { Legend } from 'former-kit'

import CopyText from '../../../components/CopyText'
import status from '../../../models/statusLegends'
import formatCurrency from '../../../formatters/currency'

import style from './style.css'

const urlRenderer = ({ onUrlCopy, t }) => paymentLink => (
  <CopyText
    className={style.copyButton}
    text={paymentLink.url}
    strings={{
      copied: t('copied'),
    }}
    onCopy={onUrlCopy}
  />
)

const getDefaultColumns = ({
  onUrlCopy,
  t,
}) => ([
  {
    accessor: ['status'],
    align: 'center',
    orderable: true,
    renderer: item => (
      <Legend
        acronym={status[item.status].text}
        color={status[item.status].color}
      />
    ),
    title: t('models.payment_link.status'),
  },
  {
    accessor: ['product'],
    align: 'center',
    orderable: true,
    renderer: prop('name'),
    title: t('models.payment_link.product_name'),
  },
  {
    accessor: ['date_created'],
    orderable: true,
    renderer: prop('date_created'),
    title: t('models.payment_link.date_created'),
  },
  {
    accessor: ['link'],
    align: 'center',
    orderable: true,
    renderer: urlRenderer({ onUrlCopy, t }),
    title: t('models.payment_link.link'),
  },
  {
    accessor: ['paid_amount'],
    orderable: true,
    renderer: pipe(
      prop('paid_amount'),
      formatCurrency
    ),
    title: t('models.payment_link.paid_amount'),
  },
])

export default getDefaultColumns
