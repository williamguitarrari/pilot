import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import qs from 'qs'
import {
  __,
  append,
  applySpec,
  assoc,
  compose,
  contains,
  defaultTo,
  either,
  findIndex,
  identity,
  isEmpty,
  isNil,
  juxt,
  mergeAll,
  nth,
  objOf,
  path,
  pipe,
  prop,
  propEq,
  tail,
  unless,
  without,
  when,
} from 'ramda'
import {
  requestSearch,
  receiveSearch,
} from './actions'
import { requestLogout } from '../../Account/actions'

import dateSelectorPresets from '../../../models/dateSelectorPresets'
import filterOptions from '../../../models/transactionFilterOptions'
import TransactionsList from '../../../containers/TransactionsList'
import getDefaultTransactionColumns from './transactionsTableColumns'
import getColumnTranslator from '../../../formatters/columnTranslator'

const mapStateToProps = ({
  account: { client },
  transactions: { loading, query },
}) => ({ client, loading, query })

const mapDispatchToProps = dispatch => ({
  onRequestSearch: (query) => {
    dispatch(requestSearch(query))
  },

  onReceiveSearch: ({ query }) => {
    dispatch(receiveSearch({ query }))
  },
  onRequestSearchFail: (error) => {
    dispatch(requestLogout(error))
  },
})

const enhanced = compose(
  translate('transactions'),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

const getOrderColumn = (field, columns) => findIndex(
  propEq('accessor', field),
  columns
)

const getColumnAccessor = index => pipe(
  nth(index),
  prop('accessor')
)

const momentToString = momentObj => momentObj.toISOString()

const normalizeDateToString = property => pipe(
  prop(property),
  unless(
    either(isNil, isEmpty),
    pipe(momentToString, objOf(property))
  )
)

const normalizeQueryDatesToString = pipe(
  prop('dates'),
  juxt([normalizeDateToString('start'), normalizeDateToString('end')]),
  mergeAll
)

const stringToMoment = str => moment(str)

const normalizeStringToDate = property => pipe(
  prop(property),
  unless(
    either(isNil, isEmpty),
    pipe(stringToMoment, objOf(property))
  )
)

const normalizeQueryStringToDate = pipe(
  prop('dates'),
  juxt([normalizeStringToDate('start'), normalizeStringToDate('end')]),
  mergeAll,
  objOf('dates')
)

const normalizeTo = (defaultValue, propPath) => pipe(
  path(propPath),
  when(
    either(isNil, isEmpty),
    defaultTo(defaultValue)
  )
)

const normalizeQueryStructure = applySpec({
  search: normalizeTo('', ['search']),
  filters: normalizeTo({}, ['filters']),
  offset: pipe(
    normalizeTo(1, ['offset']),
    Number
  ),
  count: pipe(
    normalizeTo(15, ['count']),
    Number
  ),
  sort: {
    order: normalizeTo('descending', ['sort', 'order']),
    field: normalizeTo(['created_at'], ['sort', 'field']),
  },
})

const parseQueryUrl = pipe(
  tail,
  qs.parse,
  juxt([
    identity,
    normalizeQueryStringToDate,
    normalizeQueryStructure,
  ]),
  mergeAll
)

const getDateLabels = t => ({
  anyDate: t('dates.any'),
  cancel: t('dates.cancel'),
  confirmPeriod: t('dates.confirm'),
  custom: t('dates.custom'),
  day: t('dates.day'),
  daySelected: t('dates.day_selected'),
  daysSelected: t('dates.selected'),
  end: t('dates.end'),
  noDayOrPeriodSelected: t('dates.no_selected'),
  period: t('dates.period'),
  select: t('dates.select'),
  start: t('dates.start'),
  today: t('dates.today'),
})

class TransactionsSearch extends React.Component {
  constructor (props) {
    super(props)
    const { t } = this.props
    this.handleChartsCollapse = this.handleChartsCollapse.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePageCountChange = this.handlePageCountChange.bind(this)
    this.handleRowDetailsClick = this.handleRowDetailsClick.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handlePendingReviewsFilter = this.handlePendingReviewsFilter.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
    this.requestData = this.requestData.bind(this)
    this.requestPendingReviewsCount = this.requestPendingReviewsCount.bind(this)

    const translateColumns = getColumnTranslator(t)
    const columnsDefault = getDefaultTransactionColumns(this.handleRowDetailsClick)

    this.state = {
      clearFiltersLabel: t('clear_filters'),
      columns: translateColumns(columnsDefault),
      collapsed: true,
      dateLabels: getDateLabels(t),
      filterConfirmLabel: t('confirm_filters'),
      filtersTitle: t('filters'),
      findByLabel: t('find_by'),
      graphicLegendsTittle: t('graphic_legends'),
      graphicTittle: t('graphic'),
      itemsPerPageLabel: t('items_per_page'),
      noContentFoundMessage: t('no_content_found'),
      ofLabel: t('of'),
      pendingReviewsCount: 0,
      periodSummaryLabel: t('period_summary'),
      result: {
        total: {},
        list: {
          rows: [],
        },
        chart: {
          dataset: [],
        },
      },
      tableTitle: t('transactions'),
      totalVolumeLabel: t('total_volume'),
      transactionsNumberLabel: t('transactions_number'),
      tryFilterAgainMessage: t('try_filter_again'),
      expandedRows: [],
      selectedRows: [],
    }
  }

  componentDidMount () {
    const urlSearchQuery = this.props.history.location.search

    if (isEmpty(urlSearchQuery)) {
      this.updateQuery(this.props.query)
    } else {
      this.requestData(parseQueryUrl(urlSearchQuery))
    }

    this.requestPendingReviewsCount()
  }

  componentWillReceiveProps (nextProps) {
    const { location: { search } } = this.props // eslint-disable-line
    const { location } = nextProps

    if (search !== location.search) {
      this.requestData(parseQueryUrl(location.search))
    }
  }

  requestPendingReviewsCount () {
    const { client } = this.props

    return client
      .transactions
      .countPendingReviews()
      .then(({ count }) => {
        this.setState({
          pendingReviewsCount: count,
        })
      })
  }

  handlePendingReviewsFilter () {
    this.handleFilterChange({
      dates: {},
      search: '',
      values: {
        status: ['pending_review'],
      },
      sort: {
        field: ['created_at'],
        order: 'ascending',
      },
    })
  }

  updateQuery (query) {
    this.setState({
      expandedRows: [],
      selectedRows: [],
    })

    const buildSearchQuery = pipe(
      normalizeQueryDatesToString,
      assoc('dates', __, query),
      qs.stringify
    )

    this.props.history.push({
      pathname: 'transactions',
      search: buildSearchQuery(query),
    })
  }

  requestData (query) {
    this.props.onRequestSearch({ query })

    return this.props.client
      .transactions
      .search(query)
      .then((res) => {
        this.setState(res)
        this.props.onReceiveSearch(res)
      })
      .catch((error) => {
        this.props.onRequestSearchFail(error)
      })
  }

  handlePageCountChange (count) {
    const query = {
      ...this.props.query,
      offset: 1,
      count: parseInt(count, 10),
    }

    this.updateQuery(query)
  }

  handleOrderChange (index, order) {
    const getAccessor = getColumnAccessor(index)

    const query = {
      ...this.props.query,
      sort: {
        field: getAccessor(this.state.columns),
        order,
      },
      offset: 1,
    }

    this.updateQuery(query)
  }

  handleFilterChange (filters) {
    const {
      search,
      dates,
      values,
    } = filters

    const sort = filters.sort || this.props.query.sort

    const query = {
      ...this.props.query,
      search,
      dates,
      filters: values,
      sort,
      offset: 1,
    }

    this.updateQuery(query)
  }

  handlePageChange (page) {
    const query = {
      ...this.props.query,
      offset: page,
    }

    this.updateQuery(query)
  }

  handleChartsCollapse () {
    const { collapsed } = this.state

    this.setState({
      collapsed: !collapsed,
    })
  }

  handleRowDetailsClick (rowIndex) {
    const { history } = this.props
    const rowData = nth(rowIndex, this.state.result.list.rows)
    const { id } = rowData
    history.push(`/transactions/${id}`)
  }

  handleRowClick (index) {
    const { expandedRows } = this.state
    this.setState({
      expandedRows: contains(index, expandedRows)
        ? without([index], expandedRows)
        : append(index, expandedRows),
    })
  }

  handleExpandRow (expandedRows) {
    this.setState({
      expandedRows,
    })
  }

  handleSelectRow (selectedRows) {
    this.setState({
      selectedRows,
    })
  }

  render () {
    const {
      clearFiltersLabel,
      collapsed,
      columns,
      dateLabels,
      expandedRows,
      filterConfirmLabel,
      filtersTitle,
      findByLabel,
      graphicLegendsTittle,
      graphicTittle,
      itemsPerPageLabel,
      noContentFoundMessage,
      ofLabel,
      pendingReviewsCount,
      periodSummaryLabel,
      result: {
        total,
        list,
        chart,
      },
      selectedRows,
      tableTitle,
      totalVolumeLabel,
      transactionsNumberLabel,
      tryFilterAgainMessage,
    } = this.state

    const {
      loading,
      query: {
        count,
        dates,
        filters,
        offset,
        search,
        sort,
      },
      t,
    } = this.props

    const orderColumn = getOrderColumn(sort.field, columns)

    const pagination = {
      offset,
      total: Math.ceil(
        total.count / count
      ),
    }

    return (
      <TransactionsList
        amount={total.payment ? total.payment.paid_amount : 0}
        clearFiltersLabel={clearFiltersLabel}
        collapsed={collapsed}
        columns={columns}
        count={total.count}
        data={chart.dataset}
        dateLabels={dateLabels}
        dateSelectorPresets={dateSelectorPresets}
        dates={dates}
        expandedRows={expandedRows}
        filterConfirmLabel={filterConfirmLabel}
        filterOptions={filterOptions}
        filtersTitle={filtersTitle}
        findByLabel={findByLabel}
        graphicLegendsTittle={graphicLegendsTittle}
        graphicTittle={graphicTittle}
        handleChartsCollapse={this.handleChartsCollapse}
        handleExpandRow={this.handleExpandRow}
        handleFilterChange={this.handleFilterChange}
        handleOrderChange={this.handleOrderChange}
        handlePageChange={this.handlePageChange}
        handlePageCountChange={this.handlePageCountChange}
        handleRowClick={this.handleRowClick}
        handleSelectRow={this.handleSelectRow}
        handlePendingReviewsFilter={this.handlePendingReviewsFilter}
        itemsPerPageLabel={itemsPerPageLabel}
        loading={loading}
        noContentFoundMessage={noContentFoundMessage}
        ofLabel={ofLabel}
        order={sort ? sort.order : ''}
        orderColumn={orderColumn}
        pagination={pagination}
        pendingReviewsCount={pendingReviewsCount}
        periodSummaryLabel={periodSummaryLabel}
        rows={list.rows}
        search={search}
        selectedPage={count}
        selectedRows={selectedRows}
        t={t}
        tableTitle={tableTitle}
        totalVolumeLabel={totalVolumeLabel}
        transactionsNumberLabel={transactionsNumberLabel}
        tryFilterAgainMessage={tryFilterAgainMessage}
        values={filters}
      />
    )
  }
}

TransactionsSearch.propTypes = {
  client: PropTypes.shape({
    transactions: PropTypes.shape({
      countPendingReviews: PropTypes.func.isRequired,
      search: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  onReceiveSearch: PropTypes.func.isRequired,
  onRequestSearch: PropTypes.func.isRequired,
  onRequestSearchFail: PropTypes.func.isRequired,
  query: PropTypes.shape({
    search: PropTypes.string,
    dates: PropTypes.shape({
      start: PropTypes.instanceOf(moment),
      end: PropTypes.instanceOf(moment),
    }),
    filters: PropTypes.shape({}),
    offset: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    sort: PropTypes.shape({
      field: PropTypes.arrayOf(PropTypes.string),
      order: PropTypes.string,
    }),
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(TransactionsSearch)
