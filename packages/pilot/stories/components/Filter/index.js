import React from 'react'
import { path, split } from 'ramda'
import moment from 'moment'
import { action } from '@storybook/addon-actions'
import { DateInput, Input } from 'former-kit'
import Calendar32 from 'emblematic-icons/svg/Calendar32.svg'
import Search32 from 'emblematic-icons/svg/Search32.svg'

import Filter from '../../../src/components/Filter'
import Section from '../../Section'

import translations from '../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

const options = [
  {
    items: [
      {
        label: 'Visa',
        value: 'visa',
      },
      {
        label: 'Mastercard',
        value: 'mastercard',
      },
    ],
    key: 'card_brand',
    name: 'Bandeiras',
  },
  {
    items: [
      {
        label: 'Boleto',
        value: 'boleto',
      },
      {
        label: 'Cartão de crédito',
        value: 'credit_card',
      },
      {
        label: 'Cartão de débito',
        value: 'debit_card',
      },
      {
        label: 'Cartão de crédito estrangeiro',
        value: 'foreign_credit_card',
      },
    ],
    key: 'payment_method',
    name: 'Formas de pagamento',
  },
]

const query = {
  dates: {
    end: moment('2020-04-30T05:00:00.000Z'),
    start: moment('2020-04-25T05:00:00.000Z'),
  },
  filters: {
    payment_method: [
      'boleto',
      'credit_card',
    ],
  },
  search: 'rt_qw8e76r5wq87e6r58qw7e',
}

const FilterExample = () => (
  <Section>
    <Filter
      confirmationDisabled={false}
      disabled={false}
      clearFilterDisabled={false}
      onConfirm={action('onConfirm')}
      onChange={action('onChange')}
      onClear={action('onClear')}
      options={options}
      query={query}
      t={t}
    >
      <DateInput
        dates={query.dates}
        icon={<Calendar32 width={16} height={16} />}
        name="dates"
        selectionMode="period"
        showCalendar
      />
      <Input
        icon={<Search32 width={16} height={16} />}
        name="search"
      />
    </Filter>
  </Section>
)

export default FilterExample
