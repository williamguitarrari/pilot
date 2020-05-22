import React from 'react'
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
}) => (
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
            <DateInput
              name="dates"
              dates={filterData.dates}
              selectionMode="period"
              showCalendar
            />
            <Input
              name="linkName"
              type="text"
              value={filterData.linkName}
              className={style.inputLinkName}
              placeholder={t('pages.payment_links.filter.filter_by_link_name')}
              icon={<IconSearch width={16} height={16} />}
            />
            <Checkbox
              name="active"
              type="checkbox"
              value={filterData.active}
              label={t('pages.payment_links.filter.active')}
            />
            <Checkbox
              name="inactive"
              type="checkbox"
              value={filterData.inactive}
              label={t('pages.payment_links.filter.inactive')}
            />
          </Filter>
        </Card>
      </Col>
    </Row>
  </Grid>
)

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
