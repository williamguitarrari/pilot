import React, { Component, Fragment } from 'react'
import moment from 'moment'
import {
  Card,
  CardTitle,
  CardContent,
  CardActions,
  CardSection,
  CardSectionTitle,
  DateInput,
  Input,
  Button,
  Tag,
  Row,
  Col,
  CheckboxGroup,
} from 'former-kit'

import {
  arrayOf,
  bool,
  func,
  instanceOf,
  object,
  shape,
  string,
} from 'prop-types'

import Filter32 from 'emblematic-icons/svg/Filter32.svg'
import Search32 from 'emblematic-icons/svg/Search32.svg'
import Calendar32 from 'emblematic-icons/svg/Calendar32.svg'

import {
  equals,
  partial,
  pick,
  reject,
  isNil,
  isEmpty,
  anyPass,
} from 'ramda'

import compileTags, { hasTags } from './compileTags'
import style from './style.css'


class Filters extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: true,
      search: props.search,
      values: props.values,
      dates: props.dates,
    }

    this.handleVisibility = this.handleVisibility.bind(this)
    this.handleDateInputChange = this.handleDateInputChange.bind(this)
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleCleanFilters = this.handleCleanFilters.bind(this)
    this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this)

    this.cardTitle = this.cardTitle.bind(this)
  }

  componentWillReceiveProps (props) {
    const allowed = ['search', 'values', 'dates']
    const { search, values, dates } = this.state

    const next = pick(allowed, props)
    const current = { search, values, dates }

    if (!equals(next, current)) {
      this.setState(next)
    }
  }

  handleVisibility () {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  handleDateInputChange (selectedDate) {
    this.setState({
      dates: selectedDate,
    })
  }

  handleSearchFieldChange (event) {
    this.setState({
      search: event.target.value,
    })
  }

  handleFilterChange (filter, values) {
    this.setState({
      values: {
        ...this.state.values,
        [filter]: values,
      },
    })
  }

  handleCleanFilters () {
    const filters = {
      values: [],
      search: '',
      dates: this.props.dates,
    }

    this.props.onChange(filters)
  }

  handleFiltersSubmit (event) {
    event.preventDefault()

    const {
      values,
      search,
      dates,
    } = this.state

    const currentFilters = {
      values,
      search,
      dates,
    }

    this.setState({
      collapsed: true,
    })

    this.props.onChange(currentFilters)
  }

  cardTitle () {
    const optionsKeys = Object.keys(this.state.values)

    const { collapsed } = this.state

    if (!collapsed) {
      return 'Menos filtros'
    }

    if (collapsed && optionsKeys.length === 0) {
      return 'Mais filtros'
    }

    return 'Editar filtros'
  }

  renderToolbar () {
    const {
      dateLabels,
      datePresets,
      findByLabel,
    } = this.props

    const {
      dates,
    } = this.state

    const isDateActive = dates.start !== null && dates.end !== null

    return (
      <div className={style.inputs}>
        <DateInput
          dates={dates}
          active={isDateActive}
          onChange={this.handleDateInputChange}
          presets={datePresets}
          icon={<Calendar32 width={16} height={16} />}
          disabled={this.props.disabled}
          strings={dateLabels}
        />
        <Input
          className={style.searchField}
          icon={<Search32 width={16} height={16} />}
          value={this.state.search}
          placeholder={findByLabel}
          onChange={this.handleSearchFieldChange}
          active={!!this.state.search}
          disabled={this.props.disabled}
        />
      </div>
    )
  }

  renderOptions () {
    const {
      values,
      collapsed,
    } = this.state

    const { options } = this.props

    return (
      <CardSection>
        <CardSectionTitle
          title={this.cardTitle()}
          collapsed={collapsed}
          onClick={() => this.setState({ collapsed: !collapsed })}
        />
        {!collapsed &&
          <CardContent>
            <Row flex>
              {options.map(({ name, items, key }) => (
                <Col key={name}>
                  <h4 className={style.filtersTitle}>{name}</h4>
                  <CheckboxGroup
                    disabled={this.props.disabled}
                    columns={items.length > 6 ? 2 : 1}
                    className={style.checkboxGroup}
                    options={items}
                    name={name}
                    onChange={partial(this.handleFilterChange, [key])}
                    values={values[key] || []}
                  />
                </Col>
              ))}
            </Row>
          </CardContent>
        }
      </CardSection>
    )
  }

  renderTags () {
    const {
      collapsed,
      values,
    } = this.state

    const {
      options,
    } = this.props

    const rejectEmptyProperties = reject(anyPass([isNil, isEmpty]))

    const finalValues = rejectEmptyProperties(values)

    if (collapsed && hasTags(finalValues)) {
      const tags = compileTags(options, finalValues)

      return (
        <Fragment>
          <div className={style.selectedOptionsTitle}>
            Opções selecionadas:
          </div>
          <div className={style.selectedOptionsTags}>
            {tags.map(({ value, label }) => (
              <Tag key={value}>
                {label}
              </Tag>
            ))}
          </div>
        </Fragment>
      )
    }

    return null
  }

  renderActions () {
    const {
      clearLabel,
      confirmLabel,
    } = this.props

    const originalFilters = {
      search: this.props.search,
      dates: this.props.dates,
      values: this.props.values,
    }

    const currentFilters = {
      search: this.state.search,
      dates: this.state.dates,
      values: this.state.values,
    }

    const filtersChanged = !equals(originalFilters, currentFilters)

    return (
      <CardActions>
        <Button
          relevance={filtersChanged ? 'normal' : 'low'}
          onClick={this.handleCleanFilters}
          fill="outline"
          disabled={this.props.disabled}
        >
          {clearLabel}
        </Button>

        <Button
          relevance={filtersChanged ? 'normal' : 'low'}
          disabled={!filtersChanged || this.props.disabled}
          type="submit"
          fill="gradient"
        >
          {confirmLabel}
        </Button>
      </CardActions>
    )
  }

  render () {
    const { title } = this.props

    return (
      <Card className={style.allowOverflow}>
        <form action="/" method="post" onSubmit={this.handleFiltersSubmit}>
          <CardTitle
            title={title}
            icon={<Filter32 width={16} height={16} />}
          />

          <CardContent className={style.cardContent}>
            {this.renderToolbar()}
            {this.renderOptions()}
            {this.renderTags()}
          </CardContent>

          {this.renderActions()}
        </form>
      </Card>
    )
  }
}

Filters.propTypes = {
  options: arrayOf(shape({
    key: string,
    name: string,
    items: arrayOf(shape({
      label: string,
      value: string,
    })),
  })),
  values: object, //eslint-disable-line
  search: string,
  dates: shape({
    start: instanceOf(moment),
    end: instanceOf(moment),
  }),
  datePresets: arrayOf(shape({
    key: string,
    title: string,
    date: string,
    items: arrayOf(shape({
      title: string,
      date: func,
    })),
  })),
  onChange: func,
  disabled: bool,
  title: string.isRequired, // eslint-disable-line react/no-typos
  findByLabel: string.isRequired, // eslint-disable-line react/no-typos
  clearLabel: string.isRequired, // eslint-disable-line react/no-typos
  confirmLabel: string.isRequired, // eslint-disable-line react/no-typos
  dateLabels: shape({
    anyDate: string,
    cancel: string,
    confirmPeriod: string,
    custom: string,
    day: string,
    daySelected: string,
    daysSelected: string,
    end: string,
    noDayOrPeriodSelected: string,
    period: string,
    select: string,
    start: string,
    today: string,
  }).isRequired,
}

Filters.defaultProps = {
  options: [],
  values: {},
  search: '',
  dates: {
    start: moment(),
    end: moment(),
  },
  datePresets: [],
  onChange: () => undefined,
  disabled: false,
}

export default Filters
