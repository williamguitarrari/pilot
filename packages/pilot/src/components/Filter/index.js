import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
} from 'former-kit'

import Form from 'react-vanilla-form'

import {
  allPass,
  anyPass,
  complement,
  either,
  flatten,
  identity,
  ifElse,
  isEmpty,
  isNil,
  is,
  map,
  mergeDeepLeft,
  pipe,
  values,
} from 'ramda'

import moment from 'moment-timezone'

import compileTags from './compileTags'
import CheckboxesGroup from './CheckboxesGroup'

import Toolbar from './Toolbar'
import Tags from './Tags'

import style from './style.css'

const isNilOrEmpty = anyPass([isNil, isEmpty])

const getFilters = pipe(
  mergeDeepLeft,
  values,
  flatten
)

const isDate = either(is(Date), moment.isMoment)

const formatIfDate = ifElse(
  isDate,
  date => moment(date).format('MM/DD/YYYY HH:mm:ss'),
  identity
)

const isNotDateObject = allPass([
  is(Object),
  complement(is(String)),
  complement(isDate),
])

export const stringifyDates = ifElse(
  isNotDateObject,
  map(property => stringifyDates(property)),
  formatIfDate
)

const Filter = ({
  children,
  clearFilterDisabled,
  confirmationDisabled,
  disabled,
  onChange,
  onClear,
  onConfirm,
  options,
  query,
  t,
}) => {
  const [collapsed, setCollapsed] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [filterQuery, setFilterQuery] = useState(query)

  useEffect(() => {
    setFilterQuery(query)
  }, [query])

  useEffect(() => {
    const {
      filters: localFilters,
    } = filterQuery

    const {
      filters: urlFilters,
    } = query

    setSelectedFilters(
      getFilters(urlFilters, localFilters)
    )
  }, [filterQuery, query])

  const handleToogleMoreFilters = () => {
    setCollapsed(!collapsed)
  }

  const handleFiltersSubmit = (filters) => {
    setCollapsed(true)
    onConfirm(filters)
  }

  const handleFiltersChange = (newQuery) => {
    setFilterQuery(newQuery)
    onChange(newQuery)
  }

  const isClearFilterDisabled = (
    isNilOrEmpty(query.search)
    && isNilOrEmpty(selectedFilters)
    && clearFilterDisabled
  )

  const isOptionsEmptyOrCollapsed = (
    isNilOrEmpty(options) || collapsed
  )

  const filters = () => {
    const {
      filters: localFilters,
    } = filterQuery

    const {
      filters: urlFilters,
    } = query

    return mergeDeepLeft(urlFilters, localFilters)
  }

  return (
    <Card className={style.allowOverflow}>
      <Form
        data={filterQuery}
        onChange={handleFiltersChange}
        onSubmit={handleFiltersSubmit}
      >
        <Toolbar
          collapsed={collapsed}
          confirmDisabled={confirmationDisabled || disabled}
          disabled={disabled}
          isClearFilterDisabled={isClearFilterDisabled}
          handleToogleMoreFilters={handleToogleMoreFilters}
          isEmptyOptions={!isNilOrEmpty(options)}
          onClear={onClear}
          t={t}
        >
          {children}
        </Toolbar>
        <CheckboxesGroup
          disabled={disabled}
          options={options}
          selectedFilters={selectedFilters}
          isOptionsEmptyOrCollapsed={isOptionsEmptyOrCollapsed}
        />
        {!isNilOrEmpty(selectedFilters)
          && (
            <Tags
              t={t}
              tags={compileTags(options, filters())}
            />
          )
        }
      </Form>
    </Card>
  )
}

Filter.propTypes = {
  children: PropTypes.node.isRequired,
  clearFilterDisabled: PropTypes.bool,
  confirmationDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    key: PropTypes.string,
    name: PropTypes.string,
  })),
  query: PropTypes.object, // eslint-disable-line
  t: PropTypes.func.isRequired,
}

Filter.defaultProps = {
  clearFilterDisabled: true,
  confirmationDisabled: true,
  disabled: false,
  onChange: () => null,
  options: [],
  query: {},
}

export default Filter
