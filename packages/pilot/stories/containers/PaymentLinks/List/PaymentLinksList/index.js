import React from 'react'
import { path, split } from 'ramda'
import { action } from '@storybook/addon-actions'

import Section from '../../../../Section'
import PaymentLinksList from '../../../../../src/containers/PaymentLinks/List/PaymentLinksList'

import translations from '../../../../../public/locales/pt/translations.json'
import links from './links.json'

const t = sentence => path(split('.', sentence), translations)

const WithEmptyList = () => (
  <Section>
    <PaymentLinksList
      t={t}
      rows={[]}
      loading={false}
      pagination={{
        offset: 0,
        total: 0,
      }}
      count={15}
      onExport={action('onExport')}
      onOrderChange={action('onOrderChange')}
      onPageChange={action('onPageChange')}
      onPageCountChange={action('onPageCountChange')}
      onRowClick={action('onRowClick')}
      pageCount={15}
    />
  </Section>
)

const WithList = () => (
  <Section>
    <PaymentLinksList
      t={t}
      rows={links}
      loading={false}
      pagination={{
        offset: 1,
        total: 1,
      }}
      count={15}
      onExport={action('onExport')}
      onOrderChange={action('onOrderChange')}
      onPageChange={action('onPageChange')}
      onPageCountChange={action('onPageCountChange')}
      onRowClick={action('onRowClick')}
      order="descending"
      orderField="created_at"
      pageCount={15}
    />
  </Section>
)

const WithListLoading = () => (
  <Section>
    <PaymentLinksList
      t={t}
      rows={links}
      loading
      pagination={{
        offset: 1,
        total: 1,
      }}
      count={15}
      onExport={action('onExport')}
      onOrderChange={action('onOrderChange')}
      onPageChange={action('onPageChange')}
      onPageCountChange={action('onPageCountChange')}
      onRowClick={action('onRowClick')}
      pageCount={15}
    />
  </Section>
)

export default {
  WithEmptyList,
  WithList,
  WithListLoading,
}
