import React from 'react'
import { path, split } from 'ramda'
import moment from 'moment'

import { action } from '@storybook/addon-actions'
import Section from '../../../Section'
import Search from '../../../../src/containers/PaymentLinks/Search'

import translations from '../../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

const SearchExample = () => (
  <Section>
    <Search
      filterData={{
        active: true,
        dates: {
          end: moment().add('1', 'month'),
          start: moment(),
        },
        inactive: false,
        linkName: 'lk_a98s7d69fasd',
      }}
      onFilterChanged={action('onFilterChanged')}
      onFilterClear={action('onFilterClear')}
      onFilterConfirm={action('onFilterConfirm')}
      t={t}
    />
  </Section>
)

export default SearchExample
