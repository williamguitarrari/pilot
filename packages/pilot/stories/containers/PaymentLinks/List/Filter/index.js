import React from 'react'
import { path, split } from 'ramda'
import moment from 'moment'

import { action } from '@storybook/addon-actions'
import Section from '../../../../Section'
import Filter from '../../../../../src/containers/PaymentLinks/List/Filter'

import translations from '../../../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

const FilterExample = () => (
  <Section>
    <Filter
      query={{
        active: true,
        dates: {
          end: moment(),
          start: moment().subtract(1, 'month'),
        },
        inactive: false,
        name: 'Pulseira gótica',
      }}
      onApply={action('onApply')}
      onQueryChange={action('onQueryChange')}
      onReset={action('onReset')}
      t={t}
    />
  </Section>
)

export default FilterExample
