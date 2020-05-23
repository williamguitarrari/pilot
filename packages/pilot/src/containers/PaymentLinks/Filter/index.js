import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Card, isMomentPropValidation,
  Input, DateInput, Checkbox, Button,
} from 'former-kit'

import CalendarIcon from 'emblematic-icons/svg/Calendar24.svg'
import SearchIcon from 'emblematic-icons/svg/Search32.svg'

import style from './style.css'

const Filter = ({
  fieldsData,
  onApply,
  onReset,
  t,
}) => {
  const [dates, setDates] = useState(fieldsData.dates)
  const [linkNameQuery, setLinkNameQuery] = useState(fieldsData.linkNameQuery)
  const [active, setActive] = useState(fieldsData.active)
  const [inactive, setInactive] = useState(fieldsData.inactive)

  const applyHandler = () => {
    onApply({
      active,
      dates,
      inactive,
      linkNameQuery,
    })
  }

  const resetHandler = () => {
    setDates(fieldsData.dates)
    setLinkNameQuery(fieldsData.linkNameQuery)
    setActive(fieldsData.active)
    setInactive(fieldsData.inactive)
    onReset()
  }

  return (
    <Card>
      <div className={style.cardContainer}>
        <div className={style.leftContainer}>
          <DateInput
            name="dates"
            icon={<CalendarIcon width={12} height={12} />}
            dates={dates}
            onChange={setDates}
            selectionMode="period"
          />
          <Input
            name="linkName"
            type="text"
            value={linkNameQuery}
            onChange={e => setLinkNameQuery(e.target.value)}
            className={style.linkNameQueryInput}
            placeholder={t('pages.payment_links.filter.filter_by_link_name')}
            icon={<SearchIcon width={12} height={12} />}
          />
          <Checkbox
            name="active"
            type="checkbox"
            value="active"
            checked={active}
            onChange={() => setActive(!active)}
            label={t('pages.payment_links.filter.active')}
          />
          <Checkbox
            name="inactive"
            type="checkbox"
            value="inactive"
            checked={inactive}
            onChange={() => setInactive(!inactive)}
            label={t('pages.payment_links.filter.inactive')}
          />
        </div>
        <div className={style.rightContainer}>
          <Button
            relevance="normal"
            onClick={resetHandler}
            fill="outline"
          >
            {t('components.filter.reset')}
          </Button>
          <Button
            relevance="normal"
            onClick={applyHandler}
          >
            {t('components.filter.apply')}
          </Button>
        </div>
      </div>
    </Card>
  )
}

Filter.propTypes = {
  fieldsData: PropTypes.shape({
    active: PropTypes.bool,
    dates: PropTypes.shape({
      end: isMomentPropValidation,
      start: isMomentPropValidation,
    }),
    inactive: PropTypes.bool,
    linkNameQuery: PropTypes.string,
  }).isRequired,
  onApply: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default Filter
