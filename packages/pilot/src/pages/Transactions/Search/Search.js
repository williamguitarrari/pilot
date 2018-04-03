import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import cockpit from 'cockpit'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import qs from 'qs'
import {
  __,
  applySpec,
  assoc,
  compose,
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
  pipe,
  prop,
  propEq,
  tail,
  unless,
  when,
} from 'ramda'
import {
  requestSearch,
  receiveSearch,
} from './actions'

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

const convertToNumber = property => pipe(
  prop(property),
  unless(
    either(isNil, isEmpty),
    Number
  )
)

const convertPropertiesToNumber = applySpec({
  offset: convertToNumber('offset'),
  count: convertToNumber('count'),
})

const normalizeProp = (propName, defaultValue) => pipe(
  prop(propName),
  when(either(isNil, isEmpty), defaultTo(defaultValue))
)

const normalizeQueryStructure = applySpec({
  search: normalizeProp('search', ''),
  filters: normalizeProp('filters', {}),
  offset: normalizeProp('offset', 1),
  count: normalizeProp('count', 15),
  sort: normalizeProp('sort', {}),
})

const parseQueryUrl = pipe(
  tail,
  qs.parse,
  juxt([
    identity,
    normalizeQueryStringToDate,
    convertPropertiesToNumber,
    normalizeQueryStructure,
  ]),
  mergeAll
)

class TransactionsSearch extends React.Component {
  constructor (props) {
    super(props)
    const { t } = this.props
    this.handleChartsCollapse = this.handleChartsCollapse.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePageCountChange = this.handlePageCountChange.bind(this)
    this.handleTableRowClick = this.handleTableRowClick.bind(this)
    this.requestData = this.requestData.bind(this)
    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)

    const translateColumns = getColumnTranslator(t)
    const columnsDefault = getDefaultTransactionColumns(this.handleTableRowClick)

    this.state = {
      clearFiltersLabel: t('clear_filters'),
      client: cockpit(props.client),
      columns: translateColumns(columnsDefault),
      collapsed: true,
      filterConfirmLabel: t('confirm_filters'),
      filtersTitle: t('filters'),
      findByLabel: t('find_by'),
      graphicTittle: t('graphic'),
      itemsPerPageLabel: t('items_per_page'),
      noContentFoundMessage: t('no_content_found'),
      ofLabel: t('of'),
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
  }

  componentWillReceiveProps (nextProps) {
    const { location: { search } } = this.props // eslint-disable-line
    const { location } = nextProps

    if (search !== location.search) {
      this.requestData(parseQueryUrl(location.search))
    }
  }

  updateQuery (query) {
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

    return this.state.client
      .transactions
      .search(query)
      .then((res) => {
        this.setState(res)
        this.props.onReceiveSearch(res)
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

    const query = {
      ...this.props.query,
      search,
      dates,
      filters: values,
      offset: 1,
    }

    this.updateQuery(query)
  }

  handlePageChange (page) {
    const query = {
      ...this.props.query,
      offset: page,
    }

    this.setState({
      expandedRows: [],
      selectedRows: [],
    })

    this.updateQuery(query)
  }

  handleChartsCollapse () {
    const { collapsed } = this.state

    this.setState({
      collapsed: !collapsed,
    })
  }

  handleTableRowClick (rowIndex) {
    const { history } = this.props
    const rowData = nth(rowIndex, this.state.result.list.rows)
    const { id } = rowData
    history.push(`/transactions/${id}`)
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
      collapsed,
      columns,
      result: {
        total,
        list,
        chart,
      },
      clearFiltersLabel,
      filterConfirmLabel,
      filtersTitle,
      findByLabel,
      graphicTittle,
      itemsPerPageLabel,
      noContentFoundMessage,
      ofLabel,
      periodSummaryLabel,
      tableTitle,
      totalVolumeLabel,
      transactionsNumberLabel,
      tryFilterAgainMessage,
      expandedRows,
      selectedRows,
    } = this.state

    const {
      loading,
      query: {
        search,
        dates,
        filters,
        sort,
        count,
        offset,
      },
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
        count={total.count}
        amount={total.payment ? total.payment.paid_amount : 0}
        search={search}
        values={filters}
        dates={dates}
        filterOptions={filterOptions}
        dateSelectorPresets={dateSelectorPresets}
        collapsed={collapsed}
        order={sort ? sort.order : ''}
        rows={list.rows}
        columns={columns}
        orderColumn={orderColumn}
        pagination={pagination}
        handleRowClick={this.handleTableRowClick}
        handlePageChange={this.handlePageChange}
        handleOrderChange={this.handleOrderChange}
        handleFilterChange={this.handleFilterChange}
        handleChartsCollapse={this.handleChartsCollapse}
        handlePageCountChange={this.handlePageCountChange}
        data={chart.dataset}
        loading={loading}
        selectedPage={count}
        graphicTittle={graphicTittle}
        tableTitle={tableTitle}
        periodSummaryLabel={periodSummaryLabel}
        transactionsNumberLabel={transactionsNumberLabel}
        totalVolumeLabel={totalVolumeLabel}
        itemsPerPageLabel={itemsPerPageLabel}
        ofLabel={ofLabel}
        filtersTitle={filtersTitle}
        findByLabel={findByLabel}
        clearFiltersLabel={clearFiltersLabel}
        filterConfirmLabel={filterConfirmLabel}
        noContentFoundMessage={noContentFoundMessage}
        tryFilterAgainMessage={tryFilterAgainMessage}
        expandedRows={expandedRows}
        selectedRows={selectedRows}
        handleExpandRow={this.handleExpandRow}
        handleSelectRow={this.handleSelectRow}
      />
    )
  }
}

TransactionsSearch.propTypes = {
  client: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  onReceiveSearch: PropTypes.func.isRequired,
  onRequestSearch: PropTypes.func.isRequired,
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
