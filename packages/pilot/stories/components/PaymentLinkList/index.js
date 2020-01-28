import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import {
  __,
  hasPath,
  identity,
  juxt,
  path,
  pipe,
  split,
  when,
} from 'ramda'

import PaymentLinksList from '../../../src/containers/PaymentLinks/Table'
import Section from '../../Section'

import rows from './mocks'

const translations = {
  pages: {
    payment_links: {
      filters: {
        available: 'Disponível',
        inactive: 'Inativo',
        paid: 'Pago',
      },
    },
  },
}

const getTranslation = pipe(
  split('.'),
  when(
    hasPath(__, translations),
    path(__, translations)
  ),
  identity
)

const pageSizeOptions = [15, 30, 60, 100]

const initialQuery = {
  dates: {
    end: moment(),
    start: moment().subtract(7, 'days'),
  },
  search: '',
  statuses: [],
}

const PaymentLinksListExample = () => {
  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [exporting, setExporting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [orderField, setOrderField] = useState(3)
  const [order, setOrder] = useState('ascending')
  const [filter, setFilter] = useState(initialQuery)

  const toggleExporting = () => {
    setExporting(true)

    setTimeout(() => setExporting(false), 200)
  }

  const handlePageChange = (page) => {
    setLoading(true)

    setTimeout(() => {
      setCurrentPage(page)
      setLoading(false)
    }, 200)
  }

  const handleOrderChange = (field, newOrder) => {
    setOrderField(field)
    setOrder(newOrder)
  }

  return (
    <Section>
      <PaymentLinksList
        currentPage={currentPage}
        totalPages={15}
        data={rows}
        disabled={loading}
        exporting={exporting}
        filter={filter}
        itemsPerPage={itemsPerPage}
        loading={loading}
        onFilterClear={juxt([
          action('onFilterClear'),
          () => setFilter(initialQuery),
        ])}
        onFilterConfirm={action('onFilterConfirm')}
        onFilterChange={juxt([
          action('onFilterChange'),
          setFilter,
        ])}
        onExport={juxt([
          action('onExport'),
          toggleExporting,
        ])}
        onOrderChange={juxt([
          action('onOrderChange'),
          handleOrderChange,
        ])}
        onPageChange={juxt([
          action('onPageChange'),
          handlePageChange,
        ])}
        onPageCountChange={juxt([
          action('onPageCountChange'),
          setItemsPerPage,
        ])}
        onRowClick={action('onRowClick')}
        order={order}
        orderField={orderField}
        pageSizeOptions={pageSizeOptions.map(i => ({
          name: `items_per_page ${i}`,
          value: `${i}`,
        }))}
        t={getTranslation}
      />
    </Section>
  )
}

export default PaymentLinksListExample
