import React from 'react'
import { path, split } from 'ramda'
import { action } from '@storybook/addon-actions'

import Section from '../../../Section'
import PaymentLinksList from '../../../../src/containers/PaymentLinks/PaymentLinksList'

import translations from '../../../../public/locales/pt/translations.json'
import links from './links.json'

const t = sentence => path(split('.', sentence), translations)

const WithEmptyList = () => (
  <Section>
    <PaymentLinksList
      t={t}
      amount={0}
      rows={[]}
      loading={false}
      pagination={{
        offset: 0,
        total: 0,
      }}
      count={15}
      exporting={false}
      onExport={action('onExport')}
      onOrderChange={action('onOrderChange')}
      onPageChange={action('onPageChange')}
      onPageCountChange={action('onPageCountChange')}
      onRowClick={action('onRowClick')}
    />
  </Section>
)

const WithList = () => (
  <Section>
    <PaymentLinksList
      t={t}
      amount={0}
      rows={links}
      loading={false}
      pagination={{
        offset: 1,
        total: 1,
      }}
      count={15}
      exporting={false}
      onExport={action('onExport')}
      onOrderChange={action('onOrderChange')}
      onPageChange={action('onPageChange')}
      onPageCountChange={action('onPageCountChange')}
      onRowClick={action('onRowClick')}
      order="descending"
      orderField={['created_at']}
    />
  </Section>
)

const WithListExporting = () => (
  <Section>
    <PaymentLinksList
      t={t}
      amount={0}
      rows={links}
      loading={false}
      pagination={{
        offset: 1,
        total: 1,
      }}
      count={15}
      exporting
      onExport={action('onExport')}
      onOrderChange={action('onOrderChange')}
      onPageChange={action('onPageChange')}
      onPageCountChange={action('onPageCountChange')}
      onRowClick={action('onRowClick')}
    />
  </Section>
)

const WithListLoading = () => (
  <Section>
    <PaymentLinksList
      t={t}
      amount={0}
      rows={links}
      loading
      pagination={{
        offset: 1,
        total: 1,
      }}
      count={15}
      exporting={false}
      onExport={action('onExport')}
      onOrderChange={action('onOrderChange')}
      onPageChange={action('onPageChange')}
      onPageCountChange={action('onPageCountChange')}
      onRowClick={action('onRowClick')}
    />
  </Section>
)

export default {
  WithEmptyList,
  WithList,
  WithListExporting,
  WithListLoading,
}
