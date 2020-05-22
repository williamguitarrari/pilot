import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Grid, Row, Col, Card,
  Input, DateInput, Checkbox,
  isMomentPropValidation,
} from 'former-kit'
import IconSearch from 'emblematic-icons/svg/Search32.svg'

import Filter from '../../../components/Filter'
import style from './style.css'

const Search = ({
  filterData,
  onFilterChanged,
  onFilterClear,
  onFilterConfirm,
  t,
}) => {
  const [active, setActive] = useState(false)
  const [inactive, setInactive] = useState(true)

  useEffect(() => {
    console.log('EFFECT', active)
  }, [active])

  return (
    <Grid>
      <Row>
        <Col
          palm={12}
          tablet={12}
          desk={12}
          tv={12}
        >
          <Card>
            <Filter
              confirmationDisabled={false}
              disabled={false}
              clearFilterDisabled={false}
              onConfirm={onFilterConfirm}
              onChange={onFilterChanged}
              onClear={onFilterClear}
              query={filterData}
              t={t}
            >
              <div>
                <DateInput
                  name="dates"
                  dates={filterData.dates}
                  selectionMode="period"
                  showCalendar
                />
              </div>
              <Input
                name="linkName"
                type="text"
                value={filterData.linkName}
                className={style.inputLinkName}
                placeholder={t('pages.payment_links.filter.filter_by_link_name')}
                icon={<IconSearch width={16} height={16} />}
              />
              <div>
                <Checkbox
                  name="active"
                  value={active}
                  checked={active}
                  onChange={() => {
                    console.log('CURRENTLY ', active)
                    setActive(!active)
                  }}
                  label={t('pages.payment_links.filter.active')}
                />
              </div>
              <div>
                <Checkbox
                  name="inactive"
                  value={inactive}
                  checked={inactive}
                  onChange={() => setInactive(!inactive)}
                  label={t('pages.payment_links.filter.inactive')}
                />
              </div>
            </Filter>
          </Card>
        </Col>
      </Row>
    </Grid>
  )
}

Search.propTypes = {
  filterData: PropTypes.shape({
    active: PropTypes.bool,
    dates: PropTypes.shape({
      end: isMomentPropValidation,
      start: isMomentPropValidation,
    }),
    inactive: PropTypes.bool,
    linkName: PropTypes.string,
  }).isRequired,
  onFilterChanged: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
  onFilterConfirm: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default Search
