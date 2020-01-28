import React from 'react'
import PropTypes from 'prop-types'
import {
  CheckboxGroup,
  DateInput,
  Input,
  Flexbox,
} from 'former-kit'
import Calendar32 from 'emblematic-icons/svg/Calendar32.svg'
import Search32 from 'emblematic-icons/svg/Search32.svg'

import translateDateInput from '../../../formatters/dateInputTranslator'
import Filter from '../../Filter'

import style from './style.css'

const PaymentLinksFilter = ({
  className,
  dateSelectorPresets,
  disabled,
  onChange,
  onClear,
  onConfirm,
  query,
  t,
}) => (
  <div
    className={className}
  >
    <Filter
      disabled={disabled}
      onClear={onClear}
      onChange={onChange}
      onConfirm={onConfirm}
      t={t}
      query={query}
    >
      <DateInput
        dates={query.dates}
        icon={<Calendar32 width={16} height={16} />}
        name="dates"
        presets={dateSelectorPresets}
        selectionMode={
          query.dates.start.isSame(query.dates.end, 'day')
            ? 'single'
            : 'period'
        }
        strings={translateDateInput(t)}
      />
      <Input
        icon={<Search32 width={16} height={16} />}
        name="search"
        placeholder={t('pages.payment_links.filters.text_search_placeholder')}
      />
      <Flexbox
        className={style.checkboxGroup}
        alignItems="center"
      >
        <CheckboxGroup
          columns={3}
          disabled={disabled}
          name="statuses"
          options={[
            {
              label: t('pages.payment_links.filters.paid'),
              value: 'paid',
            },
            {
              label: t('pages.payment_links.filters.available'),
              value: 'available',
            },
            {
              label: t('pages.payment_links.filters.inactive'),
              value: 'inactive',
            },
          ]}
        />
      </Flexbox>
    </Filter>
  </div>
)

PaymentLinksFilter.propTypes = {
  className: PropTypes.string,
  dateSelectorPresets: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.func,
      title: PropTypes.string,
    })),
    key: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  query: PropTypes.shape({
    dates: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    statuses: PropTypes.arrayOf(PropTypes.oneOf([
      'available', 'inactive', 'paid',
    ])).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

PaymentLinksFilter.defaultProps = {
  className: null,
  disabled: false,
}

export default PaymentLinksFilter
