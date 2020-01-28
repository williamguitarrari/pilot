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

const initialQuery = {
  dates: {
    end: moment(),
    start: moment().subtract(7, 'days'),
  },
  search: '',
  statuses: [],
}

const PaymentLinksListExample = () => {
  const [filter, setFilter] = useState(initialQuery)

  return (
    <Section>
      <PaymentLinksList
        filter={filter}
        onFilterClear={juxt([
          action('onFilterClear'),
          () => setFilter(initialQuery),
        ])}
        onFilterConfirm={action('onFilterConfirm')}
        onFilterChange={juxt([
          action('onFilterChange'),
          setFilter,
        ])}
        t={getTranslation}
      />
    </Section>
  )
}

export default PaymentLinksListExample
