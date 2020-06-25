import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  Checkbox,
  DateInput,
  Input,
  isMomentPropValidation,
} from 'former-kit'

import CalendarIcon from 'emblematic-icons/svg/Calendar24.svg'
import SearchIcon from 'emblematic-icons/svg/Search32.svg'
import dateSelectorPresets from '../../../../models/dateSelectorPresets'
import translateDateInput from '../../../../formatters/dateInputTranslator'

import style from './style.css'

const Filter = ({
  onApply,
  onQueryChange,
  onReset,
  query,
  t,
}) => (
  <Card>
    <div className={style.cardContainer}>
      <div className={style.leftContainer}>
        <DateInput
          dates={query.dates}
          icon={<CalendarIcon width={12} height={12} />}
          name="dates"
          strings={translateDateInput(t)}
          presets={dateSelectorPresets(t)}
          selectedPreset="days-30"
          onChange={onQueryChange('dates')}
          selectionMode="period"
        />
        <Input
          name="name"
          type="text"
          value={query.name}
          onChange={e => onQueryChange('name', e.target.value)}
          className={style.linkNameQueryInput}
          placeholder={t('pages.payment_links.filter.filter_by_link_name')}
          icon={<SearchIcon width={12} height={12} />}
        />
        <Checkbox
          name="active"
          type="checkbox"
          value="active"
          checked={query.active}
          onChange={() => onQueryChange('active', !query.active)}
          label={t('pages.payment_links.filter.active')}
        />
        <Checkbox
          name="inactive"
          type="checkbox"
          value="inactive"
          checked={query.inactive}
          onChange={() => onQueryChange('inactive', !query.inactive)}
          label={t('pages.payment_links.filter.inactive')}
        />
      </div>
      <div className={style.rightContainer}>
        <Button
          relevance="normal"
          onClick={onReset}
          fill="outline"
        >
          {t('components.filter.reset')}
        </Button>
        <Button
          relevance="normal"
          onClick={onApply}
        >
          {t('components.filter.apply')}
        </Button>
      </div>
    </div>
  </Card>
)

Filter.propTypes = {
  onApply: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  query: PropTypes.shape({
    active: PropTypes.bool,
    dates: PropTypes.shape({
      end: isMomentPropValidation,
      start: isMomentPropValidation,
    }),
    inactive: PropTypes.bool,
    linkNameQuery: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default Filter
