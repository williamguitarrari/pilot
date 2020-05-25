import React from 'react'
import {
  pipe,
  prop,
} from 'ramda'
import classNames from 'classnames'
import copyToClipBoard from 'clipboard-copy'
import { Legend } from 'former-kit'

import IconCopy from 'emblematic-icons/svg/Copy24.svg'

import style from './style.css'

import ClickableDiv from '../../../components/ClickableDiv'
import formatCurrency from '../../../formatters/currency'
import formatDate from '../../../formatters/longDate'
import paymentLinkStatus from '../../../models/paymentLinkStatusLegends'

const renderLink = (item) => {
  const isLinkActive = item.status === 'active'
  const handleLink = (e) => {
    e.stopPropagation()
    copyToClipBoard(item.url)
  }
  const eventHandlers = {
    onClick: handleLink,
    onKeyPress: handleLink,
  }

  return (
    <ClickableDiv
      className={
        classNames(
          style.link,
          { [style['link--active']]: isLinkActive }
        )
      }
      {...(isLinkActive ? eventHandlers : {})}
    >
      { item.url }
      <IconCopy />
    </ClickableDiv>
  )
}

const renderTotalPaid = (item) => {
  const { amount, orders_paid: ordersPaid } = item

  return (
    <div>
      { formatCurrency(amount * ordersPaid) }
    </div>
  )
}

const renderStatusLegend = t => (item) => {
  const statusText = t(paymentLinkStatus[item.status].text)

  return (
    <div className={style.centralizedItem}>
      <Legend
        acronym={statusText}
        color={paymentLinkStatus[item.status].color}
        hideLabel
        textColor={paymentLinkStatus[item.status].textColor}
        textFormat="capitalize"
      >
        {statusText}
      </Legend>
    </div>
  )
}

const getDefaultColumns = ({ t }) => ([
  {
    accessor: ['status'],
    orderable: true,
    renderer: renderStatusLegend(t),
    title: t('pages.payment_links.list.status'),
    width: 100,
  },
  {
    accessor: ['name'],
    orderable: true,
    title: t('pages.payment_links.list.link_name'),
  },
  {
    accessor: ['created_at'],
    orderable: true,
    renderer: pipe(prop('date_created'), formatDate),
    title: t('pages.payment_links.list.created_at'),
  },
  {
    accessor: ['url'],
    orderable: true,
    renderer: renderLink,
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
