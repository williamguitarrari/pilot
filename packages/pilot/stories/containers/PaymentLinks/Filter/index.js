import React from 'react'
import { path, split } from 'ramda'
import moment from 'moment'

import { action } from '@storybook/addon-actions'
import Section from '../../../Section'
import Filter from '../../../../src/containers/PaymentLinks/Filter'

import translations from '../../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

const FilterExample = () => (
  <Section>
    <Filter
      searchData={{
        active: true,
        dates: {
          end: moment(),
          start: moment().subtract(1, 'month'),
        },
        inactive: false,
        linkNameQuery: 'Pulseira gótica',
      }}
      onReset={action('onReset')}
      onApply={action('onApply')}
      t={t}
    />
  </Section>
)

export default FilterExample
